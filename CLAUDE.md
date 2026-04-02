# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This repo is a home maintenance tracking system for a ~6,000 sq ft house in Leesburg, VA (built ~2000). It contains maintenance checklists, a kanban board for active tasks, capital item tracking, and a completed work log. There is no application code, build system, or tests.

## Key Files

- **house-maintenance-knowledge.md** — Master checklist organized by cadence (monthly, quarterly/seasonal, annual) plus capital/lifecycle items and a kanban board. This is the primary working document.
- **home-maintenance-export.md** — Full system export including the system prompt, house profile JSON, all checklists in JSON format, kanban board state, and notes. This is the structured data backup.

## How the System Works

The maintenance data lives in two complementary formats:
- The knowledge file uses markdown checklists and tables for human readability
- The export file uses JSON blocks for structured data interchange

Both files track the same information and should stay in sync when updated:
- **Checklists**: Tasks grouped by cadence with seasonal assignments (Q1=Winter, Q2=Spring, Q3=Summer, Q4=Fall)
- **Kanban board**: Four columns — Backlog, Up Next, In Progress, Done
- **Capital items**: Major systems with lifespan tracking and replacement planning
- **Completed work log**: Historical record of finished tasks with dates

## House-Specific Context

- 3 HVAC units (2 large replaced within last 10 years, 1 small original unit on borrowed time)
- Steel roof (recently serviced, good until ~2036) — skip roof inspection checklist items
- Brand new driveway — skip driveway crack checks
- 47 windows total: 11 replaced Fall 2025, 36 original needing phased replacement
- Water heater anode rod is seized — unit is ride-to-failure, plan replacement
- Dog (Bailey) affects filter replacement frequency
- Owner is skilled DIY with wood shop

## When Editing

- Keep both markdown files in sync when making changes
- Preserve the JSON structure in the export file
- Use task IDs (e.g., m01, q2-05, t01) when referencing specific items
- Seasonal tasks map to: Q1=Jan-Mar, Q2=Apr-Jun, Q3=Jul-Sep, Q4=Oct-Dec
- When adding kanban tasks, capture: task description, location, urgency (routine/soon/urgent), DIY vs hire-out, and estimated cost if known
- Log completed work with dates in both files
