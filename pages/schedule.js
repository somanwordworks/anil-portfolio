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
    const [events, setEvents] = useState([]);

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvents, setSelectedEvents] = useState([]);

    const [pressImages, setPressImages] = useState([]);

    // Fetch events from API
    useEffect(() => {
        async function loadEvents() {
            try {
                const res = await fetch("/api/schedule");
                const data = await res.json();

                // Keep only today and future events
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const upcoming = (data.events || []).filter(ev => {
                    const evDate = new Date(ev.event_date);
                    evDate.setHours(0, 0, 0, 0);
                    return evDate >= today;
                });

                // Sort upcoming events by date
                upcoming.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));

                setEvents(upcoming);

            } catch (err) {
                console.error("Error loading events", err);
            }
        }
        loadEvents();
    }, []);


    // Fetch press release images
    useEffect(() => {
        async function loadPress() {
            const res = await fetch("/api/press-images");
            const data = await res.json();
            setPressImages(data);
        }
        loadPress();
    }, []);

    // Generate calendar days
    useEffect(() => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(currentDate);
        setDays(eachDayOfInterval({ start: monthStart, end: monthEnd }));
    }, [currentDate]);

    // Check if a date has an event
    const hasEvent = (date) => {
        return events.some((event) =>
            isSameDay(new Date(event.event_date), date)
        );
    };

    return (
        <>
            <Header />

            {/* TWO COLUMN LAYOUT */}
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* LEFT SIDE — FIXED HEIGHT + SCROLLABLE EVENTS */}
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
                                onClick={() => {
                                    setSelectedDate(day);
                                    setSelectedEvents(
                                        events.filter((ev) =>
                                            isSameDay(new Date(ev.event_date), day)
                                        )
                                    );
                                }}
                                className="p-3 border rounded relative hover:bg-gray-100 cursor-pointer"
                            >
                                {format(day, "d")}

                                {hasEvent(day) && (
                                    <span className="w-2 h-2 bg-saffron rounded-full absolute bottom-2 left-1/2 -translate-x-1/2"></span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* UPCOMING EVENTS — SCROLLABLE */}
                    <div className="flex-1 overflow-y-auto pr-2">
                        <h2 className="text-lg font-semibold mb-3">Upcoming Events</h2>

                        {events.length === 0 ? (
                            <p className="text-gray-500">No events yet.</p>
                        ) : (
                            <div className="space-y-4 pb-4">
                                {events.map((event) => (
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
                        )}
                    </div>
                </div>

                {/* RIGHT SIDE — PRESS RELEASE SCROLLER */}
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

            {/* Modal */}
            {selectedDate && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-saffron">
                                {format(selectedDate, "dd MMM yyyy")}
                            </h2>
                            <button
                                onClick={() => setSelectedDate(null)}
                                className="text-gray-400 hover:text-black"
                            >
                                ✕
                            </button>
                        </div>

                        {selectedEvents.length === 0 ? (
                            <p className="text-gray-600 text-sm">No events on this date.</p>
                        ) : (
                            <div className="space-y-4">
                                {selectedEvents.map((ev) => (
                                    <div key={ev.id} className="border p-4 rounded">
                                        <div className="font-bold">{ev.title}</div>
                                        <div className="text-sm text-gray-600">
                                            {ev.description}
                                        </div>
                                        {ev.location && (
                                            <div className="text-sm mt-1">📍 {ev.location}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}
