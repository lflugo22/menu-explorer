---
device_type: 3700_cond_gateway
version: "All"
# REVIEW: No firmware version string is stated in this manual. Document is Edition 10, dated 04/2025.
# This file covers sensors connected to an sc digital gateway (Table 3 in manual).
label: "3700 Conductivity (Digital Gateway)"
compatible_controllers:
  - sc4500
# REVIEW: The manual explicitly names SC4500 as the primary controller for the digital gateway path.
# Other SC controllers are not mentioned for this connection variant.
---

## Settings
> Enter identification information for the sensor and change options for data handling and storage.

- name: Name
> Changes the name for the device at the top of the measurement screen; limited to 16 characters.

- measurement_type: Measurement Type
> Changes the measured parameter to Conductivity (default), Concentration, TDS or Salinity; changing the parameter resets all other settings to defaults.

- conductivity_unit: Conductivity Unit
> Changes the conductivity units to µS/cm (default), mS/cm or S/cm; only available when Measurement Type is set to Conductivity, Concentration or Salinity.

- cell_constant_parameters: Cell Constant Parameters
> Changes the cell constant to the actual certified K value from the label on the sensor cable; default: 4.70; only available when Measurement Type is set to Conductivity or Salinity.

- concentration_measurement: Concentration Measurement
> Sets the type of concentration table to use — Built-in (default) or User defined; only available when Measurement Type is set to Concentration.

- tds: TDS (Total Dissolved Solids)
> Sets the factor used to convert conductivity to TDS — NaCl (default) or User defined; only available when Measurement Type is set to TDS.

- temperature: Temperature
> Sets the temperature units to °C (default) or °F.

- t_compensation: T-compensation
> Adds a temperature-dependent correction to the measured value — None, Linear (default: 2.0%/°C, 25 °C), Natural water, or Temperature compensation table.

- data_logger_interval: Data Logger Interval
> Sets the time interval for sensor and temperature measurement storage in the data log — Disabled (default), 5, 10, 15, 30 seconds, 1, 5, 10, 15, 30 minutes or 1, 2, 6, 12 hours.

- alternating_current_frequency: Alternating Current Frequency
> Selects the power line frequency for best noise rejection — 50 or 60 Hz (default).

- filter: Filter
> Sets a time constant (0 to 60 seconds, default 0) to calculate a rolling average and increase signal stability.

- temperature_element: Temperature Element
> Sets the temperature element for automatic temperature compensation to PT1000 (default) or Manual.

- last_calibration: Last Calibration
> Sets a reminder for the next calibration (default: 60 days); a reminder shows on the display after the selected interval from the date of the last calibration.

- sensor_days: Sensor Days
> Sets a reminder for sensor replacement (default: 365 days); a reminder shows on the display after the selected interval.

- reset_setup: Reset Setup
> Sets the Settings menu to factory defaults and resets all counters; all device information is lost.

## Calibration
> Calibration options for the inductive conductivity sensor connected to an sc digital gateway.

- zero_calibration: Zero Calibration (0-point Calibration)
> Defines the unique zero point of the conductivity sensor by holding the dry sensor in air; must be completed before calibrating with a reference solution for the first time.

- conductivity_calibration: Conductivity Calibration
> Calibrates conductivity using a reference solution or process sample with a secondary verification instrument; modifies calibration slope and/or offset.

- tds_calibration: TDS Calibration
> Calibrates the TDS measurement using a process sample with a secondary verification instrument.

- concentration_calibration: Concentration Calibration
> Calibrates the concentration measurement using a process sample with a secondary verification instrument.

- temperature_adjustment: 1-Point Temperature Calibration (Temperature Adjustment)
> Calibrates the temperature measurement by entering the exact temperature of a reference water sample.

- reset_calibration_defaults: Reset to Calibration Defaults (Reset Setup)
> Resets the calibration to factory default settings; all sensor calibration information is lost.

## Diagnostics
> Shows current and historical information about the sensor.

- sensor_information: Sensor Information
> Shows the sensor model number, serial number, software version and driver version installed.

- calibration_history: Calibration History
> Shows the cell constant parameters, offset correction and date of the last calibration.

### Counter
- sensor_days_counter: Sensor Days
> Shows the number of days the sensor has been in operation.

- reset_counter: Reset
> Resets the Sensor Days counter to zero; reset when the sensor is replaced.

### Sensor Signals
- sensor_signal: Sensor Signal
> Shows the current measurement analog-to-digital converter counter; allows setting the sensor range (default: 6).

- sensor_measurement: Sensor Measurement
> Shows the current sensor reading.