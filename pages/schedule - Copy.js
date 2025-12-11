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

    // Fetch events from API
    useEffect(() => {
        async function loadEvents() {
            try {
                const res = await fetch("/api/schedule");
                const data = await res.json();
                setEvents(data.events || []);
            } catch (err) {
                console.error("Error loading events", err);
            }
        }
        loadEvents();
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
            {/* HEADER */}
            <Header />

            <div className="max-w-4xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold mb-6 text-saffron">Schedule</h1>

                {/* Month Navigation */}
                <div className="flex justify-between items-center mb-6">
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
                <div className="grid grid-cols-7 text-center font-semibold text-gray-600 mb-2">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center">
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

                {/* Event List */}
                <div className="mt-10">
                    <h2 className="text-lg font-semibold mb-3">Upcoming Events</h2>

                    {events.length === 0 ? (
                        <p className="text-gray-500">No events yet.</p>
                    ) : (
                        <div className="space-y-4">
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

                {/* Modal for Selected Date */}
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
                                                <div className="text-sm mt-1">
                                                    📍 {ev.location}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* FOOTER */}
            <Footer />
        </>
    );
}
