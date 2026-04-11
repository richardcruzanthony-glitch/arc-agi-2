# ARA Phase 3 Hotfix Installation Guide

This hotfix addresses three critical issues in ARA's ARC puzzle-solving system:
1. **Wrong Domain Routing**: Ensures ARA uses the correct analytical branch for puzzles.
2. **No Memory of Success**: Persists successful rules and grids to `us-complete.txt` and PostgreSQL.
3. **No Puzzle Recall**: Checks for previous solutions before attempting a puzzle.

## Prerequisites

- Termux environment with ARA installed in `~/ara`.
- PostgreSQL running on Termux with the `ara` database.
- Phase 2 patches should already be applied.

## Installation Steps

### 1. Download the Hotfix Files
Ensure all hotfix files are in the same directory (e.g., `~/ara-hotfix/`):
- `phase3_hotfix.py`
- `puzzle_knowledge_base.json`
- `ARA_Military_Medical_Scenario.mjs`

### 2. Run the Hotfix Installer
Execute the Python script to patch `runARC.py` and `cognitiveLoop.ts`:

```bash
cd ~/ara-hotfix
python3 phase3_hotfix.py --ara-dir ~/ara
```

The script will:
- Create backups of `runARC.py` and `cognitiveLoop.ts` with a `.bak` suffix.
- Fix the `extractPuzzleData` parser bug.
- Inject memory writing and PostgreSQL update hooks.
- Enable puzzle recall at the start of the analytical branch.

### 3. Verify the Installation
Check that the patches were applied correctly:

```bash
grep "PHASE 3 HOTFIX" ~/ara/runARC.py
grep "PHASE 3 HOTFIX" ~/ara/cognitiveLoop.ts
```

### 4. Run the ARC Benchmark
Execute the benchmark to test the new logic:

```bash
cd ~/ara
python3 runARC.py
```

## Troubleshooting

- **PostgreSQL Errors**: Ensure the `ara` database is accessible and the `ara_puzzle_rules` table exists.
- **Memory Not Writing**: Check permissions for `~/ara/us-complete.txt`.
- **Parser Issues**: If `runARC.py` fails to extract grids, verify that the `={10,}` pattern was successfully removed from the regex.

## Deliverables Summary

| File | Description |
|------|-------------|
| `phase3_hotfix.py` | Comprehensive patch installer for ARA core files. |
| `puzzle_knowledge_base.json` | Detailed explanations for all 10 benchmark puzzles. |
| `ARA_Military_Medical_Scenario.mjs` | Military medical scenario for ARA testing. |
| `HOTFIX_INSTALL.md` | This installation guide. |
