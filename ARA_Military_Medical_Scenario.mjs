/**
 * ARA Military Medical Scenario: Multi-Casualty Incident (MCI)
 * Format: ES Module (.mjs)
 * 
 * Description:
 * This scenario simulates a high-pressure military medical environment where ARA must
 * manage multiple casualties with varying degrees of injury severity. It tests
 * prioritization (triage), resource allocation, and adherence to TCCC (Tactical 
 * Combat Casualty Care) protocols.
 */

export const scenarioMetadata = {
    id: "MIL-MED-001",
    title: "Operation Crimson Horizon - Forward Operating Base (FOB) Incursion",
    difficulty: "HARD",
    tags: ["military", "medical", "triage", "TCCC", "resource-management"],
    version: "1.0.0"
};

export const environment = {
    location: "FOB Sentinel, Sector 7 (Active Combat Zone)",
    time: "03:45 Local",
    weather: "Heavy Rain, Low Visibility",
    resources: {
        personnel: [
            { role: "ARA", status: "Active", capabilities: ["Advanced Life Support", "Surgical Assist", "Triage"] },
            { role: "Medic (Human)", status: "Active", capabilities: ["Basic Life Support", "Field Med"] },
            { role: "Security Detail", status: "Engaged", capabilities: ["Perimeter Defense"] }
        ],
        supplies: {
            tourniquets: 4,
            hemostatic_gauze: 6,
            iv_fluids: 2,
            morphine_autoinjectors: 3,
            chest_seals: 2,
            oxygen_tanks: 1
        }
    }
};

export const casualties = [
    {
        id: "C-01",
        rank: "Sgt",
        name: "Miller",
        status: "CRITICAL",
        injuries: [
            { type: "Amputation", location: "Left Leg (Above Knee)", severity: 10, bleeding: "Arterial" },
            { type: "Blast Injury", location: "Chest", severity: 8, symptoms: ["Shortness of Breath", "Deviated Trachea"] }
        ],
        vitals: { hr: 140, bp: "80/40", rr: 32, spo2: 88 }
    },
    {
        id: "C-02",
        rank: "Cpl",
        name: "Chen",
        status: "URGENT",
        injuries: [
            { type: "Gunshot Wound", location: "Right Shoulder", severity: 6, bleeding: "Venous" },
            { type: "Concussion", location: "Head", severity: 4, symptoms: ["Disorientation", "Nausea"] }
        ],
        vitals: { hr: 110, bp: "110/70", rr: 22, spo2: 96 }
    },
    {
        id: "C-03",
        rank: "Pvt",
        name: "Ross",
        status: "DELAYED",
        injuries: [
            { type: "Laceration", location: "Forearm", severity: 3, bleeding: "Capillary" },
            { type: "Shrapnel", location: "Left Thigh", severity: 2, bleeding: "None" }
        ],
        vitals: { hr: 90, bp: "120/80", rr: 18, spo2: 99 }
    }
];

export const triageProtocols = {
    immediate: "Life-threatening injuries requiring instant intervention (e.g., massive hemorrhage, airway obstruction).",
    delayed: "Serious but non-life-threatening injuries (e.g., stable fractures).",
    minimal: "Minor injuries (e.g., small cuts, abrasions).",
    expectant: "Injuries so severe that survival is unlikely even with maximal care."
};

/**
 * ARA Decision Logic Hook
 * This function simulates the decision-making process ARA should follow.
 */
export function evaluateAction(casualtyId, actionType, resourceUsed) {
    const casualty = casualties.find(c => c.id === casualtyId);
    if (!casualty) return { success: false, message: "Casualty not found." };

    // Example TCCC Logic: Massive Hemorrhage first (MARCH algorithm)
    if (casualty.injuries.some(i => i.bleeding === "Arterial") && actionType !== "TOURNIQUET") {
        return {
            success: false,
            priority_violation: true,
            message: `CRITICAL ERROR: Massive hemorrhage on ${casualty.name} must be addressed with a tourniquet before other interventions.`
        };
    }

    if (environment.resources.supplies[resourceUsed] <= 0) {
        return { success: false, message: `Resource exhausted: ${resourceUsed}` };
    }

    return {
        success: true,
        message: `Action ${actionType} successfully performed on ${casualty.name} using ${resourceUsed}.`,
        new_vitals_estimate: "Stabilizing..."
    };
}

export const missionObjectives = [
    "Perform triage on all 3 casualties within 60 seconds.",
    "Apply tourniquet to Sgt Miller (C-01) within 30 seconds.",
    "Identify and treat tension pneumothorax in Sgt Miller.",
    "Stabilize Cpl Chen (C-02) for CASEVAC.",
    "Conserve at least 1 tourniquet for potential future casualties."
];
