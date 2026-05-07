---
device_type: solitax_sc
version: "All"
label: "SOLITAX sc"
compatible_controllers:
  - sc200
  - sc1000
  - sc4500
---

## Sensor Setup
> Configure and operate the SOLITAX sc sensor via the sc controller.

### Configure
> Select measurement parameter, units, intervals and defaults for the sensor.

- edit_name: Edit Name
> Enter up to a 10-character sensor name using any combination of symbols and alphanumeric characters; default is the sensor serial number.

- set_parameter: Set Parameter
> Configures the sensor to measure turbidity (TRB) or suspended solids (TS); the sensor cannot measure both simultaneously.

- meas_units: Meas Units
> Selects the measurement units: TRB — FNU (default), EBC, TE/F, NTU; TS — mg/L, g/L, ppm, %.

- clean_interval: Clean Interval
> Sets the interval between automated wiper cleaning cycles — 1, 5, 15, or 30 minutes; 1, 4, or 12 hours; 1, 3, or 7 days (default: 12 hours).

- response_time: Response Time
> Sets the damping/averaging period for displayed readings, 4–20 outputs, and alarm updates — 0 to 300 seconds (default: 3 seconds).

- logger_interval: Logger Interval
> Sets the data log storage interval — 1 to 15 minutes (default: 10 minutes); logged values are the average of all readings during the previous interval.

- set_defaults: Set Defaults
> Resets all user-editable options to factory default settings.

### Calibrate

- set_outmode: Set Outmode
> Selects the behavior of the 4–20 mA outputs and alarm relays during calibration — Active, Hold, or Transfer.

- sensor_measure: Sensor Measure
> Displays the current, uncorrected measured value from the sensor.

- offset: Offset
> Sets the turbidity zero-point offset value, calculated from a deionized water reading during turbidity calibration.

- factor: Factor
> Enters the single-point calibration factor for turbidity or suspended solids, calculated from a known standard or gravimetric reference value.

#### Calibration Points
<!-- REVIEW: The manual presents CONFIGURE within CALIBRATE as the entry point for multi-point
suspended solids calibration. The sub-items below (2 Points through 5 Points) are shown as
siblings of Factor in the CONFIGURE sub-menu. Modelled here as children of a Calibration Points
branch under Calibrate > Configure. -->

- factor_single: Factor
> Single-point calibration; calculates a new factor from one grab sample and the sensor reading at that moment.

- two_points: 2 Points
> Two-point suspended solids calibration; enter pairs of sensor readings and laboratory-determined values in ascending order.

- three_points: 3 Points
> Three-point suspended solids calibration; enter pairs of sensor readings and laboratory-determined values in ascending order.

- four_points: 4 Points
> Four-point suspended solids calibration; enter pairs of sensor readings and laboratory-determined values in ascending order.

- five_points: 5 Points
> Five-point suspended solids calibration; enter pairs of sensor readings and laboratory-determined values in ascending order.

- set_cal_default: Set Cal Default
> Returns the sensor to factory default calibration settings.

### Test/Maint
> Access diagnostic information and maintenance functions for the sensor.

- wipe: Wipe
> Initiates an immediate wiping action on the sensor optical window.

- signals: Signals
> Displays the current signal outputs for the sensor.

- output_mode: Output Mode
> Selects the behavior of the instrument outputs during test/maintenance — Hold, Active, Transfer, or Selection.

- default_setup: Default Setup
> Resets all user-editable options to factory defaults.

#### Probe Info
- probe_info: Probe Info
> Displays the sensor type, sensor name, serial number, software version number, and sensor driver version number.

#### Profile
- profile_counter: Profile Counter
> Displays the number of wiper cycles remaining (counts down from 20,000).

- reset_config: Reset Config
> Manually resets the wiper profile counter; confirm with MAN. RESET ARE YOU SURE?

#### Counter
- counter: Counter
> Shows the number of hours or cycles remaining for operating hours, test/maintenance interval, gasket, and motor.

