---
device_type: ldo_sc_model2
version: "1.29"
label: "LDO sc Model 2"
compatible_controllers:
  - sc200
  - sc1000
  - sc4500
controller_labels:
  sc200:
    device_menu: "SENSOR SETUP"
    device_menu.settings: "CONFIGURE"
    device_menu.settings.name: "EDIT NAME"
    device_menu.settings.unit: "SET UNITS"
    device_menu.settings.unit.temperature: "TEMPERATURE"
    device_menu.settings.unit.measurement: "MAIN MEASURE"
    device_menu.settings.unit.altitude_pressure: "ALT/PRESS"
    device_menu.settings.altitude_pressure: "ALT/PRESS"
    device_menu.settings.salinity: "SALINITY"
    device_menu.settings.signal_average: "SIGNAL AVERAGE"
    device_menu.settings.cleaning_interval: "CLEAN INTRVL"
    device_menu.settings.reset_cleaning_interval: "RESET CLN INTRVL"
    device_menu.settings.data_logger_interval: "LOG SETUP"
    device_menu.settings.reset: "SET DEFAULTS"
    device_menu.calibration: "CALIBRATE"
    device_menu.calibration.air_calibration: "AIR CAL"
    device_menu.calibration.sample_calibration: "SAMPLE CAL"
    device_menu.calibration.reset_calibration: "RESET DFLT CAL"
    device_menu.diagnostics: "DIAG/TEST"
    device_menu.diagnostics.sensor_information: "SENSOR INFO"
    device_menu.diagnostics.serial_number: "SERIAL NUMBER"
    device_menu.diagnostics.gain_correction: "GAIN CORR"
    device_menu.diagnostics.offset_correction: "OFFSET CORR"
    device_menu.diagnostics.phase_diagnostics: "PHASE DIAG"
    device_menu.diagnostics.amplitude_diagnostics: "AMPL DIAG"
    device_menu.diagnostics.days_remaining_to_clean: "DAYS TO CLEAN"
    device_menu.diagnostics.sensor_life: "SENSOR LIFE"
    device_menu.diagnostics.service: "SERVICE"
---

# Device menu

## Settings
> Configure the sensor for measurements, cleaning reminders, data handling and storage.

- name: Name
> Changes the name that corresponds to the sensor on the measurement screen; limited to 16 characters.

### Unit
> Sets the units for temperature, measurement, and altitude/pressure.

- temperature: Temperature
> Sets the temperature units to °C (default) or °F.

- measurement: Measurement
> Sets the measurement units to mg/L, ppm (default) or %.

- altitude_pressure: Altitude/Pressure
> Sets the units for atmospheric pressure display to altitude (m or ft) or pressure (mmHg or torr).

### Altitude/Pressure

### Salinity
> Sets the salinity correction value from 0.00 (default) to 250.00 parts per thousand (‰).

### Signal Average
> Sets a time constant (0–999 seconds, default 60 s) to calculate a rolling average and increase signal stability.

### Cleaning Interval
> Sets the interval in days for the cleaning reminder (default: 0 days); set to 0 to disable.

### Reset Cleaning Interval
> Resets the Days Remaining to Clean counter back to the Cleaning Interval value.

### Data Logger Interval
> Sets the time interval for data storage in the data log (30 s, 1, 2, 5, 10, 15 [default], 30, or 60 minutes).

### Reset
> Resets all sensor settings back to factory defaults; does not change calibration slope or offset.

## Calibration
> Calibration options for the LDO sc Model 2 sensor.

- air_calibration: Air Calibration
> Recommended one-point calibration method using water-saturated air that modifies the calibration slope.

- sample_calibration: Calibration
> Calibration by comparison with a hand-held DO meter that modifies the calibration offset.

- reset_calibration: Reset Calibration
> Resets the calibration gain (slope) and offset to factory defaults (gain = 1.0, offset = 0.0).

## Diagnostics
> Sensor diagnostic and test information for troubleshooting.

- sensor_information: Sensor Information
> Shows the software version and driver version installed on the sensor.

- serial_number: Serial Number
> Shows the serial number of the sensor.

- gain_correction: Gain Correction
> Adjusts the calibration gain (slope) value within the range 0.50 to 1.5.

- offset_correction: Offset Correction
> Adjusts the calibration offset value within the range –3.00 to +3.00.

- phase_diagnostics: Phase Diagnostics
> Shows the phase for total, red and blue wavelengths; updates once per second.

- amplitude_diagnostics: Amplitude Diagnostics
> Shows the amplitude for red and blue wavelengths; updates once per second.

- days_remaining_to_clean: Days Remaining to Clean
> Shows the number of days until the next scheduled manual cleaning.

- sensor_life: Sensor Life
> Shows the number of days until the next scheduled sensor cap replacement.

- service: Service
> For service use only.