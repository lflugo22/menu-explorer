---
device_type: nt3100sc
version: "unknown"
label: "NT3100sc"
compatible_controllers:
  - sc200
  - sc1000
  - sc4500
controller_labels:
  sc200:
    diagnostics_test: "DIAG/TEST"
    diagnostics_test.signals.single_measurement: "SINGLE MEASUREMENT"
    diagnostics_test.signals.avg_measurement: "12x AVERAGE MEAS."
    maintenance.wipe_10x: "10x WIPE"
    device_menu: "Sensor setup"
  sc1000:
    diagnostics_test: "DIAG/TEST"
    diagnostics_test.signals.single_measurement: "SINGLE MEASUREMENT"
    diagnostics_test.signals.avg_measurement: "12x AVERAGE MEAS."
    maintenance.wipe_10x: "10x WIPE"
    device_menu: "Sensor setup"
---

<!-- REVIEW: Firmware version not stated in this manual. Edition 6, 03/2026 is the document version only. Using "unknown" until a firmware string is confirmed. -->

<!-- REVIEW: The SC4500 / Claros interface accesses the device menu by selecting the device tile then "Device menu". The SC200 / SC1000 path is via main menu > Sensor setup. Keys are unified here; controller_labels captures display-level differences. -->

# Device menu

## Configuration

- edit_name: Edit Name
  > Enters a description for the measurement site (default: serial number); used to identify measurement locations (e.g., Aeration tank 1), and saved with measurement values in the controller data log.
- parameter: Parameter
  > Selects the measured parameter: NOX-N (default), NOX, NO3-N or NO3.
- unit: Unit
  > Sets the measurement units: mg/L (default) or ppm.
- measurement_interval: Measurement Interval
  > Sets the measurement interval: 15 s, 30 s, 1 min, 5 min (default), 10 min, 15 min or 30 min.
- signal_average: Signal Average
  > Sets the number of saved measurements used to calculate the average (1–12, default 3); the controller shows, saves and outputs this average.
- cleaning_interval: Cleaning Interval
  > Sets the cleaning interval: once per measurement (default), 1, 5, 10 or 30 minutes, or 1, 6 or 12 hours.
- wiper_mode: Wiper Mode
  > Sets the wiper cleaning cycle: Single (one sweep per cycle), Double A-B-A, or Double B-A-B (default); the wiper must stop in the top position.
- extended_sludge_mode: Extended Sludge Mode
  > Sets the number of additional measurements per concentration calculation: High, Medium (default), Low, None, or Auto.
- bypass: Bypass
  > Set to No (default) or Yes; select Yes when the probe is installed in a flow-through unit (disables wiper out position).
- output_mode: Output Mode
  > Sets the output behaviour during calibration or maintenance: Hold, Active, Set Transfer, or Selection (default).
- service_reminder: Service Reminder
  > Sets the interval for service reminders: off, 3, 6, 12 (default) or 24 months.
- reminder_interval: Reminder Interval
  > Sets the interval for maintenance reminders: 1 day, 3 days, 1 week (default), 2, 3 or 4 weeks.
- reset_to_defaults: Reset Configuration to Defaults
  > Resets all configuration settings back to factory defaults.

## Calibration

### Offset Calibration
> Calibrates the probe by calculating and entering an offset (and optionally a factor) derived from a comparison of probe readings to laboratory measurements; this is the recommended calibration method.

- offset: Offset
  > Lowers or raises the calibration curve; valid range depends on path length (±9 mg/L for 1 mm, ±5 mg/L for 2 mm, ±2.5 mg/L for 5 mm NOx-N).
- factor: Factor
  > Adjusts the slope of the calibration curve; calculated as (High lab value – Low lab value) ÷ (High probe reading – Low probe reading).

### Standard Calibration
> Performs a 1-point calibration with a known standard to verify and adjust the calibration factor (does not change the offset); not recommended as primary calibration method.

- start_calibration: Start Calibration
  > Starts the 1-point standard calibration procedure.
- standard_value: Standard Value
  > Selects the concentration of the calibration standard (or known sample) used for the standard calibration.
- calibration_interval: Calibration Interval
  > Sets the calibration reminder interval: off (default), 1 week, 4 weeks, 3 months or 6 months.

## Maintenance

- wiper_test: Wiper Test
  > Triggers a wiper movement cycle for testing and for removing the wiper blade during cleaning procedures.
- wiper_replacement: Wiper Replacement
  > Guides the user through the wiper blade replacement procedure with on-screen instructions.
- wipe_10x: Wipe 10 Times
  > Runs 10 consecutive wiper movements; used during the measuring-path cleaning procedure with hydrochloric acid.


## Diagnostics/Test

### Signals

- single_measurement: Single Measurement
  > Performs and displays one measurement reading; used during cleaning validation and calibration checks.
- avg_measurement: 12x Average Measurement
  > Calculates and displays the average of twelve consecutive measurements; used for offset calibration and probe validation.
