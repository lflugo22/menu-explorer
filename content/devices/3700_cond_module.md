---
device_type: 3700_cond_module
version: "All"
label: "3700 Conductivity (Module)"
compatible_controllers:
  - sc4500
  - sc200
---

# Device menu

## Settings
> Enter identification information for the sensor and change options for data handling and storage.

- name: Name
> Changes the name for the device at the top of the measurement screen; limited to 16 characters.

- sensor_sn: Sensor S/N
> Lets the user enter the serial number of the sensor; limited to 16 characters.

- measurement_type: Measurement Type
> Changes the measured parameter to Conductivity (default), Concentration, TDS or Salinity; changing the parameter resets all other settings to defaults.

- format: Format
> Changes the number of decimal places shown on the measurement screen to Auto, X.XXX, XX.XX or XXX.X.

- conductivity_unit: Conductivity Unit
> Changes the conductivity units to Auto, µS/cm, mS/cm or S/cm; only available when Measurement Type is set to Conductivity or Concentration.

- temperature: Temperature
> Sets the temperature units to °C (default) or °F.

- t_compensation: T-compensation
> Adds a temperature-dependent correction to the measured value — None, Linear (default: 2.0%/°C, 25 °C), Natural water, or Temperature compensation table.

- concentration_measurement: Concentration Measurement
> Sets the type of concentration table to use — Built-in (default) or User compensation table; only available when Measurement Type is set to Concentration.

- tds: TDS (Total Dissolved Solids)
> Sets the factor used to convert conductivity to TDS — NaCl (default) or Custom; only available when Measurement Type is set to TDS.

- temperature_element: Temperature Element
> Sets the temperature element for automatic temperature compensation to PT100, PT1000 (default) or Manual.

- cell_constant_parameters: Cell Constant Parameters
> Changes the cell constant to the actual certified K value from the label on the sensor cable; default: 4.70.

- filter: Filter
> Sets a time constant (0 to 200 seconds, default 0) to calculate a rolling average and increase signal stability.

- data_logger_interval: Data Logger Interval
> Sets the time interval for sensor and temperature measurement storage in the data log — 5 or 30 seconds, or 1, 2, 5, 10, 15 (default), 30 or 60 minutes.

- reset_settings: Reset Settings to Default Values
> Sets the Settings menu to factory defaults and resets all counters; all device information is lost.

## Calibration
> Calibration options for the inductive conductivity sensor connected to a conductivity module.

### Calibration Options
> Sets calibration reminders and operator ID options; not applicable to sensors connected to an sc digital gateway.

- calibration_reminder: Calibration Reminder
> Sets a reminder interval for the next calibration (default: Off); a reminder shows on the display after the selected interval from the date of the last calibration.

- operator_id: Operator ID for Calibration
> Includes an operator ID with calibration data — Yes or No (default); the ID is entered during calibration.

- zero_calibration: Zero Calibration
> Defines the unique zero point of the conductivity sensor; must be completed before calibrating with a reference solution for the first time.

- conductivity_solution: Conductivity Solution
> Calibrates the sensor by matching its reading to a reference solution of known conductivity value; modifies the calibration slope and/or offset.

- conductivity_calibration_process: Conductivity Calibration
> Calibrates the sensor using the process sample with a secondary verification instrument.

- temperature_calibration: 1-Point Temperature Calibration
> Calibrates the temperature measurement by entering the exact temperature of a reference water sample.

- reset_calibration: Reset to Default Calibration Values
> Resets the calibration to factory default settings; all sensor calibration information is lost.

## Diagnostics
> Shows current and historical information about the sensor.

- module_information: Module Information
> Shows the version and serial number of the conductivity module.

- sensor_information: Sensor Information
> Shows the sensor name and the serial number entered by the user.

- last_calibration: Last Calibration
> Shows the number of days since the last calibration was completed.

- calibration_history: Calibration History
> Shows the calibration slope and date of previous calibrations.

- reset_calibration_history: Reset Calibration History
> For service use only.

- sensor_signals: Sensor Signals
> Shows the current conductivity and temperature reading.

- sensor_days: Sensor Days
> Shows the number of days the sensor has been in operation.

- reset: Reset
> Sets the Sensor Days counter to zero; reset when the sensor is replaced.

- factory_calibration: Factory Calibration
> For service use only.