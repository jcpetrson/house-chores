# Home Maintenance System — Full Export
## April 2, 2026

---

## System Prompt

```
You are my home maintenance assistant for a 26-year-old house in Leesburg, VA (built ~2000). The house is large, has mature landscaping, and a dog lives here.

Your job:
1. Maintain a master maintenance checklist organized by cadence: monthly, quarterly/seasonal, annual, and major capital items. When I ask to see the checklist, present it organized by cadence and indicate what's due based on the current month/season.
2. Track tasks on a kanban board with four columns: Backlog, Up Next, In Progress, and Done. I'll tell you when to add tasks, move them between columns, or mark them complete. When I say "board" or "kanban," show me the current state.
3. When I add a new task, ask me for enough detail to be useful later: what the task is, urgency (routine, soon, urgent), estimated cost if known, and whether I'm DIYing it or hiring out. Default to Backlog unless I say otherwise.
4. At the start of each conversation, check what month it is and proactively flag anything that's coming due in the next 30 days from the master checklist. If something is overdue, say so directly.
5. Keep a running log of completed work with dates so I can track maintenance history over time.

House context to keep in mind:
* Leesburg, VA - Mid-Atlantic climate, hot humid summers, occasional ice/snow winters
* ~26 years old, so original systems (roof, HVAC, water heater, windows) may be at or past expected lifespan
* Dog in the house (affects filter schedules, floor maintenance)
* I have a wood shop and am comfortable with most DIY work
* I prefer direct, practical advice. No fluff.

Response style: Terse, organized, no unnecessary commentary. Use tables or structured lists when showing the board or checklist. Don't repeat context I already know.
```

---

## House Profile

```json
{
  "address_area": "Leesburg, VA",
  "year_built": 2000,
  "house_age_years": 26,
  "sqft": 6000,
  "climate": "Mid-Atlantic (hot/humid summers, cold winters with occasional ice/snow)",
  "dog": { "name": "Bailey", "impact": "HVAC filters monthly, floor wear" },
  "owner_skills": "Skilled DIY, has wood shop",
  "structures": ["main house", "carriage house"]
}
```

---

## Capital Items — Current Status

```json
[
  {
    "system": "Roof",
    "type": "Steel",
    "typical_lifespan_years": "40-70",
    "status": "Recently serviced — extensive work done",
    "next_evaluation": "~2036",
    "action_needed": "None"
  },
  {
    "system": "HVAC — Unit 1 (large)",
    "status": "Replaced within last 10 years",
    "action_needed": "Monitor, good shape"
  },
  {
    "system": "HVAC — Unit 2 (large)",
    "status": "Replaced within last 10 years",
    "action_needed": "Monitor, good shape"
  },
  {
    "system": "HVAC — Unit 3 (small)",
    "status": "Original, still running",
    "action_needed": "Budget for replacement — living on borrowed time"
  },
  {
    "system": "Water heater",
    "status": "2nd unit",
    "notes": "Anode rod seized/impossible to remove. Riding to failure.",
    "action_needed": "Plan replacement, know shutoff locations"
  },
  {
    "system": "Windows",
    "total_count": 47,
    "replaced_count": 11,
    "replaced_date": "Fall 2025",
    "original_count": 36,
    "action_needed": "Prioritize replacing originals over time — losing efficiency"
  },
  {
    "system": "Deck",
    "status": "Rebuilt ~2018",
    "age_years": 8,
    "action_needed": "Annual inspect and seal — mid-life"
  },
  {
    "system": "Driveway",
    "status": "Brand new (~2026)",
    "action_needed": "None for years"
  },
  {
    "system": "Exterior paint",
    "typical_lifespan_years": "7-15",
    "status": "Unknown — inspect annually"
  },
  {
    "system": "Garage door opener",
    "typical_lifespan_years": "10-15",
    "status": "Unknown"
  },
  {
    "system": "Sump pump",
    "typical_lifespan_years": "7-10",
    "status": "Unknown — replace proactively, keep backup"
  },
  {
    "system": "Garbage disposal",
    "typical_lifespan_years": "8-15",
    "status": "Unknown"
  },
  {
    "system": "Dishwasher",
    "typical_lifespan_years": "10-15",
    "status": "Unknown"
  },
  {
    "system": "Washer/dryer",
    "typical_lifespan_years": "10-15",
    "status": "Unknown"
  },
  {
    "system": "Cast iron drain pipes",
    "typical_lifespan_years": "50-75",
    "status": "Fine for now — scope if slow drains appear"
  },
  {
    "system": "Electrical panel",
    "typical_lifespan_years": "25-40",
    "status": "Evaluate capacity and condition"
  }
]
```

---

## Master Checklist

### Monthly

```json
[
  { "id": "m01", "task": "Replace HVAC filters", "notes": "More frequent with dog hair" },
  { "id": "m02", "task": "Clean garbage disposal", "notes": "Ice + citrus or baking soda + vinegar" },
  { "id": "m03", "task": "Run water in rarely-used fixtures", "notes": "Keep P-traps from drying out" },
  { "id": "m04", "task": "Test smoke and CO detectors", "notes": "Replace batteries 2x/year" },
  { "id": "m05", "task": "Check water softener salt level", "notes": "If applicable" },
  { "id": "m06", "task": "Inspect under sinks for leaks or moisture" },
  { "id": "m07", "task": "Clean range hood filter" },
  { "id": "m08", "task": "Check sump pump operation", "notes": "If applicable" }
]
```

### Q1 — Winter (January–March)

```json
[
  { "id": "q1-01", "task": "Check for ice dams after heavy snow" },
  { "id": "q1-02", "task": "Inspect attic for condensation or frost" },
  { "id": "q1-03", "task": "Check exposed pipes in unheated spaces for insulation integrity", "notes": "Garage, crawlspace" },
  { "id": "q1-04", "task": "Test water heater pressure relief valve" },
  { "id": "q1-05", "task": "Check for drafts around windows and doors" },
  { "id": "q1-06", "task": "Inspect weatherstripping and caulking on exterior doors" },
  { "id": "q1-07", "task": "Deep clean kitchen exhaust and vent" },
  { "id": "q1-08", "task": "Service snowblower / winter equipment" }
]
```

### Q2 — Spring (April–June)

```json
[
  { "id": "q2-01", "task": "Walk full exterior: inspect siding, trim, foundation for winter damage" },
  { "id": "q2-02", "task": "Clean gutters and downspouts" },
  { "id": "q2-03", "task": "Check grading around foundation", "notes": "Water should flow away from house" },
  { "id": "q2-04", "task": "Service AC / heat pump before cooling season", "notes": "Filter, coils, refrigerant" },
  { "id": "q2-05", "task": "Pressure wash siding, driveway, walkways, deck" },
  { "id": "q2-06", "task": "Inspect deck/patio for rot, loose boards, popped fasteners" },
  { "id": "q2-07", "task": "Check exterior faucets and hose bibs for freeze damage" },
  { "id": "q2-08", "task": "Inspect and clean dryer vent", "notes": "Fire hazard" },
  { "id": "q2-09", "task": "Open crawlspace vents", "notes": "If applicable" },
  { "id": "q2-10", "task": "Treat for termites / schedule pest inspection" },
  { "id": "q2-11", "task": "Test irrigation system, check heads and zones" },
  { "id": "q2-12", "task": "Touch up exterior paint and caulking" },
  { "id": "q2-13", "task": "Inspect and clean window wells" },
  { "id": "q2-14", "task": "Fertilize and treat lawn", "notes": "Aerate if needed" },
  { "id": "q2-15", "task": "Mulch beds, trim shrubs away from house" }
]
```

### Q3 — Summer (July–September)

```json
[
  { "id": "q3-01", "task": "Check attic ventilation and insulation" },
  { "id": "q3-02", "task": "Inspect and clean bathroom exhaust fans" },
  { "id": "q3-03", "task": "Trim trees and shrubs away from house and roof" },
  { "id": "q3-04", "task": "Check and clean condensate drain line on AC" },
  { "id": "q3-05", "task": "Inspect garage door hardware, lubricate tracks and rollers" },
  { "id": "q3-06", "task": "Check caulking around windows and doors (exterior)" },
  { "id": "q3-07", "task": "Inspect and repair any cracked mortar on chimney or brick" },
  { "id": "q3-08", "task": "Power wash and reseal deck if needed" },
  { "id": "q3-09", "task": "Check driveway for cracks", "notes": "N/A — driveway is brand new" }
]
```

### Q4 — Fall (October–December)

```json
[
  { "id": "q4-01", "task": "Clean gutters again after leaves drop" },
  { "id": "q4-02", "task": "Service furnace / heat pump before heating season" },
  { "id": "q4-03", "task": "Drain and disconnect outdoor hoses" },
  { "id": "q4-04", "task": "Shut off interior valves to exterior hose bibs" },
  { "id": "q4-05", "task": "Reverse ceiling fan direction (clockwise for winter)" },
  { "id": "q4-06", "task": "Inspect and replace weatherstripping as needed" },
  { "id": "q4-07", "task": "Close crawlspace vents", "notes": "If applicable" },
  { "id": "q4-08", "task": "Blow out irrigation system" },
  { "id": "q4-09", "task": "Test generator", "notes": "If applicable" },
  { "id": "q4-10", "task": "Check fireplace / chimney — schedule sweep if needed" },
  { "id": "q4-11", "task": "Inspect and clean window tracks" },
  { "id": "q4-12", "task": "Stock winter supplies (ice melt, sand)" },
  { "id": "q4-13", "task": "Check battery backup on sump pump and garage door opener" }
]
```

### Annual

```json
[
  { "id": "a01", "task": "Have HVAC system professionally serviced", "notes": "Spring for AC, fall for heat" },
  { "id": "a02", "task": "Professional chimney inspection and sweep" },
  { "id": "a03", "task": "Scope main sewer line with camera", "notes": "Especially with mature trees" },
  { "id": "a04", "task": "Flush water heater to remove sediment" },
  { "id": "a05", "task": "Test and inspect all GFCIs and AFCIs" },
  { "id": "a06", "task": "Inspect electrical panel for signs of corrosion or overheating" },
  { "id": "a07", "task": "Check and update home inventory / insurance documentation" },
  { "id": "a08", "task": "Inspect attic for pest intrusion, insulation displacement, moisture" },
  { "id": "a09", "task": "Inspect crawlspace or basement for moisture, cracks, pest activity" },
  { "id": "a10", "task": "Deep clean dryer vent from exterior termination point" },
  { "id": "a11", "task": "Lubricate all door hinges, locks, and garage door springs" },
  { "id": "a12", "task": "Inspect all toilets for running, leaks at base, and flapper condition" },
  { "id": "a13", "task": "Test garage door auto-reverse safety feature" },
  { "id": "a14", "task": "Reseal natural stone countertops", "notes": "If applicable" },
  { "id": "a15", "task": "Service whole-house humidifier", "notes": "If applicable" }
]
```

---

## Kanban Board — Current State

```json
{
  "backlog": [
    {
      "id": "t01",
      "task": "Fix broken shutter",
      "location": "Side attic window",
      "urgency": "soon",
      "type": "DIY"
    },
    {
      "id": "t02",
      "task": "Add window film — carriage house",
      "details": "3 windows, privacy film",
      "urgency": "routine",
      "type": "DIY"
    },
    {
      "id": "t03",
      "task": "Fix vents — basement",
      "location": "Workout room & woodshop",
      "details": "Screws pulled out, vents hanging",
      "urgency": "soon",
      "type": "DIY"
    },
    {
      "id": "t04",
      "task": "Replace small HVAC unit",
      "details": "3rd unit, original, still running. Plan proactively.",
      "urgency": "routine",
      "type": "TBD"
    },
    {
      "id": "t05",
      "task": "Water heater replacement planning",
      "details": "2nd unit, anode rod seized. Riding to failure. Know shutoff locations.",
      "urgency": "routine",
      "type": "TBD"
    }
  ],
  "up_next": [],
  "in_progress": [],
  "done": []
}
```

---

## Completed Work Log

```json
[]
```

---

## Notes

- Roof inspection (Q2 checklist) skipped — steel roof recently serviced, good until ~2036
- Driveway crack check (Q3 checklist) — N/A, driveway is brand new
- 36 of 47 windows are original — plan phased replacement
- Water heater anode rod is seized — not serviceable, plan for full replacement when unit fails
