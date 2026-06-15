---
device_type: as950_phd_sc
version: "Any"
label: "AS950 pHD"
compatible_controllers:
  - as950_controller
---

<!-- REVIEW: Firmware version not stated in the manual. Edition 5 (01/2025) is used as the publication reference; version set to "unknown". -->

# Configure Sensors

## Setup Wizard

> Configures all the sensor settings. Calibrates the sensor. Obey the screen prompts to complete the procedures.

## Calibration

### pH Calibration

- 1pt_auto: 1-point auto correction
  > Uses one buffer (e.g., pH 7); the sensor automatically identifies the buffer during calibration.

- 2pt_auto: 2-point auto correction
  > Uses two buffers (e.g., pH 7 and pH 4); the sensor automatically identifies the buffers during calibration (recommended).

- 1pt_manual: 1-point manual correction
  > Uses a sample of known pH value or one buffer; the user enters the pH value during calibration.

- 2pt_manual: 2-point manual correction
  > Uses two samples of known pH value or two buffers; the user enters the pH values during calibration.

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

## Basic Settings

  - ac_freq: AC Frequency
    > Selects the power line frequency to get the best noise rejection.
    - ac_freq_50: 50 Hz
    - ac_freq_60: 60 Hz (default)

  - allways_on: Always On
    > Sets the sensor to operate continuously or to only operate during the data logging interval for the sensor. Select Disable to increase the battery life
    - allways_on_enabled: Enabled (default)
    - allways_on_disabled: Disabled

## Advanced Settings
> Configures the optional, advanced sensor settings.

## Restore Defaults
> Sets the sensor settings and the sensor calibration back to the factory defaults.


