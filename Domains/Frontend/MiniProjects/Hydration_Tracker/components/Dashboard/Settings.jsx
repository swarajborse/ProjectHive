"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import { useUserSettings } from "@/app/context/UserSettings";

const Settings = () => {
    const { dailyGoal, buttonAmounts, updateSettings } = useUserSettings();

    // to edit and store local value before pushing to firestore
    const [localGoal, setLocalGoal] = useState(dailyGoal);

    // spreading it coz it's an array of value amount
    const [localButtons, setLocalButtons] = useState([...buttonAmounts]);


    // change local values whenever firestore values change to keep it in sync
    useEffect(() => {
        setLocalGoal(dailyGoal);
        setLocalButtons([...buttonAmounts]);
    }, [dailyGoal, buttonAmounts]);

    // only edit the copy of the local button - good practice to edit immutably
    const handleButtonAmount = (idx, val) => {
        const copy = [...localButtons];
        copy[idx] = Number(val);
        setLocalButtons(copy);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateSettings(localGoal, localButtons);
        toast.success("Settings saved!");
    };

    return (
        <main className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-3">
            <section className="col-span-4">
                <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
                <p className="font-semibold text-white/75 mb-6">Update your preferences.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="goal" className="block mb-2 text-white font-semibold">
                            Daily Water Goal (ml)
                        </label>
                        <input
                            id="goal"
                            type="number"
                            min="0"
                            className="w-full p-2 rounded-xl bg-blue-300 text-neutral-950 border border-blue-600/50 focus:outline-none focus:ring-1 focus:ring-blue-600"
                            value={localGoal}
                            onChange={(e) => setLocalGoal(Number(e.target.value))}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-white font-semibold">
                            Quick Add Button Amounts (ml)
                        </label>
                        <div className="flex gap-2">
                            {localButtons.map((amt, idx) => (
                                <input
                                    key={idx}
                                    type="number"
                                    min="0"
                                    className="w-full p-2 rounded-xl bg-blue-300 text-neutral-950 border border-blue-600/50 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    value={amt}
                                    onChange={(e) => handleButtonAmount(idx, e.target.value)}
                                />
                            ))}
                        </div>
                    </div>

                    <Button type="submit">Save</Button>
                </form>
            </section>
        </main>
    );
};

export default Settings;
