---
device_type: phd_sc
version: "Any"
label: "pHD/ORP"
compatible_controllers:
  - sc200
  - sc1000
  - sc4500
controller_labels:
  sc200:
    device_menu: "Sensor Setup"
    configure.name: "EDIT NAME"
    configure.select_sensor: "SELECT SENSOR"
    configure.format: "DISPLAY FORMAT"
    configure.temperature: "TEMP UNITS"
    configure.data_logger_interval: "LOG SETUP"
    configure.ac_frequency: "AC FREQUENCY"
    configure.filter: "FILTER"
    configure.temperature_element: "TEMP ELEMENT"
    configure.select_buffer: "SELECT BUFFER"
    configure.pure_h2o_comp: "PURE H2O COMP"
    configure.last_calibration: "CAL DAYS"
    configure.sensor_days: "SENSOR DAYS"
    configure.impedance_limits: "IMPED LIMITS"
    configure.reset_setup: "DEFAULT SETUP"
    calibrate.1pt_auto: "1 POINT AUTO"
    calibrate.2pt_auto: "2 POINT AUTO"
    calibrate.1pt_manual: "1 POINT MANUAL"
    calibrate.2pt_manual: "2 POINT MANUAL"
    calibrate.temp_adjust: "TEMP ADJUST"
    diagnostics.sensor_information: "PROBE INFO"
    diagnostics.calibration_history: "CAL DATA"
    diagnostics.signals: "SIGNALS"
    diagnostics.counter: "COUNTERS"
  sc1000:
    configure.name: "EDIT NAME"
    configure.select_sensor: "SELECT SENSOR"
    configure.format: "DISPLAY FORMAT"
    configure.temperature: "TEMP UNITS"
    configure.data_logger_interval: "LOG SETUP"
    configure.ac_frequency: "AC FREQUENCY"
    configure.filter: "FILTER"
    configure.temperature_element: "TEMP ELEMENT"
    configure.select_buffer: "SELECT BUFFER"
    configure.pure_h2o_comp: "PURE H2O COMP"
    configure.last_calibration: "CAL DAYS"
    configure.sensor_days: "SENSOR DAYS"
    configure.impedance_limits: "IMPED LIMITS"
    configure.reset_setup: "DEFAULT SETUP"
    calibrate.1pt_auto: "1 POINT AUTO"
    calibrate.2pt_auto: "2 POINT AUTO"
    calibrate.1pt_manual: "1 POINT MANUAL"
    calibrate.2pt_manual: "2 POINT MANUAL"
    calibrate.temp_adjust: "TEMP ADJUST"
    diagnostics.sensor_information: "PROBE INFO"
    diagnostics.calibration_history: "CAL DATA"
    diagnostics.signals: "SIGNALS"
    diagnostics.counter: "COUNTERS"
---

<!-- REVIEW: Firmware version not stated in the manual. Edition 5 (01/2025) is used as the publication reference; version set to "unknown". -->

# Device menu

## Configure

> Select a sensor name and type of sensor; change options for measurement, calibration, data handling and storage.

- name: Name
  > Changes the name displayed at the top of the measurement screen; limited to 12 characters (letters, numbers, spaces or punctuation).

- select_sensor: Select sensor
  > Selects the type of sensor (pH or ORP).

- format: Format
  > For pH sensors only—changes the number of decimal places shown on the measurement screen to XX.XX (default) or XX.X.

- temperature: Temperature
  > Sets the temperature units to °C (default) or °F.

- data_logger_interval: Data logger interval
  > Sets the time interval for data storage in the data log—Disabled, 5, 10, 15, 30 seconds, 1, 5, 10, 15 (default), 30 minutes, 1, 2, 6, 12 hours.

- ac_frequency: Alternating current frequency
  > Selects the frequency of the AC power supplied to the controller (50 or 60 Hz).

- filter: Filter
  > Sets a time constant (0 to 60 seconds) to calculate an average value and increase signal stability; 0 = no effect (default).

- temperature_element: Temperature element
  > pH sensors—sets the temperature element for automatic temperature compensation to PT100, PT1000, NTC300 (default) or Manual; ORP sensors—a temperature element can be connected to measure temperature only.

- select_buffer: Select standard buffer
  > For pH sensors only—selects the buffer solutions used for calibration: pH 4, 7, 10 (default) or DIN 19267.

- pure_h2o_comp: Pure H2O compensation
  > For pH sensors only—adds a temperature-dependent correction for pure water with additives: None (default), Ammonia, Morpholine, Pure water, User defined, or 1–4-point matrix correction.

- last_calibration: Last calibration
  > Sets a reminder interval (default: 60 days) for the next calibration; a reminder appears on the display after the selected number of days from the last calibration date.

- sensor_days: Sensor days
  > Sets the sensor replacement interval (default: 365 days); a warning appears when the sensor has been in operation longer than this interval.

- impedance_limits: Impedance limits
  > Sets the low (default: 0 MΩ) and high (default: 1000 MΩ) impedance limits for the active and reference electrodes.

- reset_setup: Reset setup
  > Sets all sensor settings back to factory defaults and resets counters; all device information is lost.

## Calibrate

<!-- REVIEW: The SC4500 path is Device menu > Calibration; SC200/SC1000 path is SENSOR SETUP > [instrument] > CALIBRATE. Both lead to the same options, so they are merged here. -->

### pH Calibration

- 1pt_auto: 1-point auto correction
  > Uses one buffer (e.g., pH 7); the sensor automatically identifies the buffer during calibration.

- 2pt_auto: 2-point auto correction
  > Uses two buffers (e.g., pH 7 and pH 4); the sensor automatically identifies the buffers during calibration (recommended).

- 1pt_manual: 1-point manual correction
  > Uses a sample of known pH value or one buffer; the user enters the pH value during calibration.

- 2pt_manual: 2-point manual correction
  > Uses two samples of known pH value or two buffers; the user enters the pH values during calibration.

### ORP Calibration

- 1pt_manual_orp: 1-point manual correction
  > Calibrates the ORP sensor against one reference solution or sample of known value; the user enters the ORP value during calibration.

### Temperature Calibration

- temp_adjust: Temperature adjustment
  > Calibrates the temperature reading against an accurate external thermometer by entering the exact measured temperature value.

### Exit Calibration

- abort: Cancel
  > Stops the calibration; a new calibration must start from the beginning.

- back_to_cal: Return to calibration
  > Returns to the in-progress calibration.

- leave: Exit
  > Exits the calibration temporarily; access to other menus is allowed and a calibration for a second sensor (if present) can be started.

### Factory Calibration

- reset_cal: Reset setup
  > Sets the sensor back to the factory calibration values.

## Diagnostics

> Access sensor diagnostic information and test readings.

<!-- REVIEW: SC4500 path is Device menu > Diagnostics/Test; SC200/SC1000 path is SENSOR SETUP > [instrument] > DIAG/TEST. -->

- sensor_information: Sensor information
  > Shows the sensor type, name, serial number, software version and driver version.

- calibration_history: Calibration history
  > Shows the pH slope (mV/pH) and date of the last calibration; the pH slope should be 55 to 61 mV/pH.

### Signals

- sensor_signal: Sensor signal
  > Shows the sensor reading in mV; the mV range is –60 to +60 mV (0 mV = pH 7).

- sens_adc_cnts: Measurement analog to digital converter counter
  > Shows the digital number that represents the pH or ORP reading.

- temp_adc_cnts: Temperature analog to digital converter counter
  > Shows the digital number that represents the temperature reading.

- imped_status: Impedance status
  > When set to Enabled (recommended), measures active and reference electrode impedance at 1-minute intervals and shows an error when impedance is outside the configured limits.

### Counter

- sensor_days_counter: Sensor days
  > Shows the number of days the sensor has been in operation.

- reset_counter: Reset
  > Sets the Sensor days and Electrode days values to zero.

- electrode_days: Electrode days
  > Shows the number of days since the salt bridge was replaced; automatically reset to zero when the salt bridge is replaced.