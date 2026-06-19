---
device_type: tss_sc
version: "latest"
label: "TSS sc"
compatible_controllers:
  - sc200
  - sc1000
  - sc4500
controller_labels:
  sc4500:
    sensor_setup: "Device menu"
---

## Sensor setup

- wipe: Wipe
  > Triggers a wiping operation.

### Calibrate (turbidity)

<!-- REVIEW: The manual lists two separate top-level "CALIBRATE" menus under SENSOR setup — one for the turbidity (TRB) parameter and one for the solid (TS) parameter — both using the identical label "CALIBRATE". Disambiguated as calibrate_trb / calibrate_ts per the key-uniqueness requirement. -->

- set_outmode: Set Outmode
  > Behavior of the outputs during calibration and zero point adjustment.
  - hold: Hold
  - active: Active
  - set_transfer: Set Transfer
- sensor_measure: Sensor Measure
  > Current, uncorrected measurement value.
- factor: Factor
  > Can be set from 0.10 to 10.00; a detailed description is provided in section 4.5 CALIBRATE.
- calibrate: Calibrate
  - memory: Memory
    - point_1: Point 1
      > Calibration point 1 is recorded.
    - point_2: Point 2
      > Calibration point 2 is recorded.
    - point_3: Point 3
      > Calibration point 3 is recorded.
    - clear_memory: Clear Memory
      > Clears the recorded values for all points.
  - point_1_current: Point 1
      > Current calibration for point 1.
  - point_2_current: Point 2
      > Current calibration for point 2.
  - point_3_current: Point 3
      > Current calibration for point 3.
  - set_cal_deflt: Set Cal Deflt
    > Security prompt, reset to default calibration.

<!-- REVIEW: The manual lists "MEMORY" containing POINT 1/2/3 (recording action) followed immediately by POINT 1/2/3 again (current calibration value display) under the same MEMORY node, using identical labels for both purposes. Keys disambiguated as point_N (recording) and point_N_current (current value display) since both pairs share the same parent path in the source. -->

### Calibrate (TS content)

- set_outmode: Set Outmode
  > Behavior of the outputs during calibration and zero point adjustment.
  - hold: Hold
  - active: Active
  - set_transfer: Set Transfer
- sensor_measure: Sensor Measure
  > Current, uncorrected measurement value.
- factor: Factor
  > Can be set from 0.10 to 10.00; detailed description in section 4.5 CALIBRATE.
- calibrate: Calibrate
  - memory: Memory
    - point_1: Point 1
      > Calibration point 1 is recorded.
    - point_2: Point 2
      > Calibration point 2 is recorded.
    - point_3: Point 3
      > Calibration point 3 is recorded.
    - clear_memory: Clear Memory
      > Clears the recorded value for all points.
  - point_1_current: Point 1
      > Current calibration for point 1.
  - point_2_current: Point 2
      > Current calibration for point 2.
  - point_3_current: Point 3
      > Current calibration for point 3.
  - set_cal_deflt: Set Cal Deflt
    > Security prompt, all calibration points are cleared.

### Configure

- edit_name: Edit Name
  > Name can include up to 16 characters. Default: Device number
- meas_units: Meas Units
  - trb: TRB
    > FNU (default), EBC, TE/F, NTU, FTU.
  - ts: TS
    > mg/L, g/L, ppm, %.
- parameters: Parameters
  > TRB (default), TS.
- clean_interval: Clean. Interval
  > 15 min, 30 min, 1 h, 4 h, 12 h, 1 day, 3 days, 7 days. Default: 4 h.
- response_time: Response Time
  > 1 to 300 s. Default: 60 s.
- logger_interval: Logger Interval
  > 10 s, 30 s, 1 min, 2 min, 3 min, 4 min, 5 min, 6 min, 10 min, 15 min, 30 min. Default: 10 min.
- set_defaults: Set Defaults
  > Security prompt, reset to default configuration for all menu options listed above.

### Test/maint

- probe_info: Probe Info
  - sensor_name: Sensor Name
    > Device name.
  - edited_name: Edited Name
  - serial_number: Serial Number
  - turbidity: Turbidity
    > 0.001 to 9999 FNU.
  - solid: Solid
    > 0.001 to 500 g/L.
  - model_number: Model Number
    > Item no. Sensor.
  - code_vers: Code Vers
    > Sensor software.
- profile: Profile
  - profile_counter: Profile Counter
    > Counter 20,000 backwards.
  - reset_config: Reset Config
    > Manual reset, security prompt.
- counters: Counters
  - manual_reset: Manual Reset. Press Enter
    > Security prompt.
  - test_maint_counter: Test/Maint (Counter)
    > Counter, X days backwards.
  - gasket_counter: Gasket (Gask.) Counter
    > Counter, X days backwards.
  - total: Total
    > Operating hours counter.
  - motor: Motor
    > Wipe cycle counter.
  - interval: Interval
    > Default for maintenance counter.
- service: Service
  - wipe: Wipe
  - signals: Signals
    > Explanation: refer to service manual.
    - s5e1: S5E1
    - s5e3: S5E3
    - s6e1: S6E1
    - s6e3: S6E3
    - s5e2: S5E2
    - s5e4: S5E4
    - s6e2: S6E2
    - s6e4: S6E4
  - set_outmode: Set Outmode
    > Equipment output behavior in the Service menu.
    - hold: Hold
    - active: Active
    - set_transfer: Set Transfer
  - service_access: Service Access

<!-- REVIEW: "COUNTERS" branch in the source (page 20) lists MANUAL RESET, then TEST/MAINT, GASKET (GASK.), TOTAL, and MOTOR each described inline as one combined block of counter descriptions, followed by INTERVAL. The exact sibling nesting (whether MANUAL RESET sits alongside or above the four counters) is somewhat ambiguous in the source layout; reconstructed as flat siblings under "counters" based on the most natural reading. -->
