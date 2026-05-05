---
device_type: phD-ORP
version: "3.4"
label: "phD-ORP v3.4"
compatible_controllers:
  - sc4500
controller_labels:
  sc200:
    devices: "Sensor Setup"
---

## Measurement

> Sensor readings and calculated outputs.

### pH

#### Slope

- slope: Slope
  > Electrode response factor.
- offset: Offset
  > Electrode zero point offset.

#### Calibration Status

- cal_status: Calibration Status
  > Last calibration result.

### Temperature

- temp: Temperature
  > Ambient temperature reading in °C.


## Calibration

> Calibration procedures and history.

### pH Calibration

- ph_slope: Slope Adjustment
  > Manual slope correction factor.
- ph_offset: Offset Adjustment
  > Manual offset correction value.

## Diagnostics

> Sensor health and error reporting.

- sensor_status: Sensor Status
  > Current operational status of the sensor.
- error_log: Error Log
  > Recent error and warning history.
- uptime: Uptime
  > Total operating time since last reset.
