import { useState, useEffect } from "react";
import {
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    format,
    addMonths,
    subMonths,
    isSameDay
} from "date-fns";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Schedule() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [days, setDays] = useState([]);

    // 🔹 NEW: separate event states
    const [allEvents, setAllEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvents, setSelectedEvents] = useState([]);

    // 🔹 NEW: tab state
    const [activeTab, setActiveTab] = useState("upcoming");

    const [pressImages, setPressImages] = useState([]);

    // -----------------------------
    // Fetch events from API
    // -----------------------------
    useEffect(() => {
        async function loadEvents() {
            try {
                const res = await fetch("/api/schedule");
                const data = await res.json();

                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const all = data.events || [];

                const upcoming = all.filter(ev => {
                    const evDate = new Date(ev.event_date);
                    evDate.setHours(0, 0, 0, 0);
                    return evDate >= today;
                });

                setAllEvents(all);
                setUpcomingEvents(upcoming);

            } catch (err) {
                console.error("Error loading events", err);
            }
        }
        loadEvents();
    }, []);

    // -----------------------------
    // Fetch press release images
    // -----------------------------
    useEffect(() => {
        async function loadPress() {
            const res = await fetch("/api/press-images");
            const data = await res.json();
            setPressImages(data);
        }
        loadPress();
    }, []);

    // -----------------------------
    // Generate calendar days
    // -----------------------------
    useEffect(() => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(currentDate);
        setDays(eachDayOfInterval({ start: monthStart, end: monthEnd }));
    }, [currentDate]);

    // -----------------------------
    // Check if a date has ANY event (past or future)
    // -----------------------------
    const hasEvent = (date) => {
        return allEvents.some(ev =>
            isSameDay(new Date(ev.event_date), date)
        );
    };

    // -----------------------------
    // Handle date click
    // -----------------------------
    const handleDateClick = (day) => {
        setSelectedDate(day);

        const eventsForDay = allEvents.filter(ev =>
            isSameDay(new Date(ev.event_date), day)
        );

        setSelectedEvents(eventsForDay);

        // 🔹 If user clicks a past date → switch to Past tab
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (day < today) {
            setActiveTab("past");
        }
    };

    return (
        <>
            <Header />

            {/* TWO COLUMN LAYOUT */}
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* LEFT SIDE */}
                <div className="h-[650px] flex flex-col overflow-hidden">

                    <h1 className="text-3xl font-bold mb-6 text-saffron">Schedule</h1>

                    {/* Month Navigation */}
                    <div className="flex justify-between items-center mb-6 flex-shrink-0">
                        <button
                            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            ←
                        </button>

                        <div className="text-xl font-semibold">
                            {format(currentDate, "MMMM yyyy")}
                        </div>

                        <button
                            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            →
                        </button>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 text-center font-semibold text-gray-600 mb-2 flex-shrink-0">
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                    </div>

                    <div className="grid grid-cols-7 gap-2 text-center mb-6 flex-shrink-0">
                        {days.map((day) => (
                            <div
                                key={day}
                                onClick={() => handleDateClick(day)}
                                className="p-3 border rounded relative hover:bg-gray-100 cursor-pointer"
                            >
                                {format(day, "d")}

                                {hasEvent(day) && (
                                    <span className="w-2 h-2 bg-saffron rounded-full absolute bottom-2 left-1/2 -translate-x-1/2"></span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* 🔹 TABS */}
                    <div className="flex gap-4 mb-3 flex-shrink-0">
                        <button
                            onClick={() => setActiveTab("upcoming")}
                            className={`px-4 py-1 rounded ${activeTab === "upcoming"
                                    ? "bg-saffron text-white"
                                    : "bg-gray-200"
                                }`}
                        >
                            Upcoming Events
                        </button>

                        <button
                            onClick={() => setActiveTab("past")}
                            className={`px-4 py-1 rounded ${activeTab === "past"
                                    ? "bg-saffron text-white"
                                    : "bg-gray-200"
                                }`}
                        >
                            Past Events
                        </button>
                    </div>

                    {/* EVENTS LIST */}
                    <div className="flex-1 overflow-y-auto pr-2">

                        {/* UPCOMING */}
                        {activeTab === "upcoming" && (
                            upcomingEvents.length === 0 ? (
                                <p className="text-gray-500">No upcoming events.</p>
                            ) : (
                                <div className="space-y-4 pb-4">
                                    {upcomingEvents.map((event) => (
                                        <div key={event.id} className="border p-4 rounded">
                                            <div className="font-semibold text-saffron">
                                                {format(new Date(event.event_date), "dd MMM yyyy")}
                                            </div>
                                            <div className="font-bold">{event.title}</div>
                                            <div className="text-sm text-gray-600">
                                                {event.description}
                                            </div>
                                            {event.location && (
                                                <div className="text-sm mt-1">
                                                    📍 <strong>{event.location}</strong>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )
                        )}

                        {/* PAST */}
                        {activeTab === "past" && (
                            selectedDate ? (
                                selectedEvents.length === 0 ? (
                                    <p className="text-gray-500">
                                        No events on selected date.
                                    </p>
                                ) : (
                                    <div className="space-y-4 pb-4">
                                        {selectedEvents.map((event) => (
                                            <div key={event.id} className="border p-4 rounded">
                                                <div className="font-semibold text-saffron">
                                                    {format(new Date(event.event_date), "dd MMM yyyy")}
                                                </div>
                                                <div className="font-bold">{event.title}</div>
                                                <div className="text-sm text-gray-600">
                                                    {event.description}
                                                </div>
                                                {event.location && (
                                                    <div className="text-sm mt-1">
                                                        📍 <strong>{event.location}</strong>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )
                            ) : (
                                <p className="text-gray-500">
                                    Select a past date from the calendar.
                                </p>
                            )
                        )}

                    </div>
                </div>

                {/* RIGHT SIDE — PRESS RELEASES (UNCHANGED) */}
                <div className="h-[650px] flex flex-col">
                    <h2 className="text-3xl font-bold mb-6 text-saffron">Press Releases</h2>

                    <div className="relative overflow-hidden flex-1 rounded-xl shadow-lg bg-white">
                        <div className="animate-press-scroll absolute w-full space-y-4">
                            {[...pressImages, ...pressImages].map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt="Press"
                                    className="w-full rounded-lg shadow-md"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
