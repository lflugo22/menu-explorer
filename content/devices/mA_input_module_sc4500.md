---
device_type: ma_input_sc4500
version: "latest"   # REVIEW: no firmware version found in the document
label: "mA Input Module"
compatible_controllers:
  - sc4500
---

# Device Menu

## Calibration

- one_point_correction: 1-point value correction
  > Select output mode, Active / Hold / Transfer to continue
  - output_mode_active: Active
    - edit_user_value_1: Edit User Value
      > Enter the user value, e.g. 4.00 mA.
  - output_mode_hold: Hold
    - edit_user_value_1: Edit User Value
      > Enter the user value, e.g. 4.00 mA.
  - output_mode_transfer: Transfer
    - edit_user_value_1: Edit User Value
      > Enter the user value, e.g. 4.00 mA.
- two_point_correction: 2-point value correction
  > Select output mode, Active / Hold / Transfer to continue
  - output_mode_active: Active
    - edit_user_value_2: Edit User Value
        - point_1: Point 1 = 4.00mA
        - point_2: Point 2 = 20.00mA
  - output_mode_hold: Hold
    - edit_user_value_2: Edit User Value
        - point_1: Point 1 = 4.00mA
        - point_2: Point 2 = 20.00mA
  - output_mode_transfer: Transfer
    - edit_user_value_2: Edit User Value
        - point_1: Point 1 = 4.00mA
        - point_2: Point 2 = 20.00mA
- calibration_options: Calibration Options
  - current: Current
  - input: Input
- reset_default_calibration: Reset to Default Calibration

## Settings

- name: Name
  > Editable setting.
- parameter_and_unit: Parameter and Unit
  - search_parameter: Search Parameter
    > Fill in text for the desired parameter, e.g. "Flow" gives 7 parameters.
  - parameter: Parameter
    > Choose a specific parameter (flow, flow totalized, etc.); if Search Parameter is not used, an extensive list of parameters is offered.
  - unit: Unit
    > A list of units to choose from is provided.
- display_range: Display Range
  - set_20ma_value: Set 20mA value
  - set_4ma_value: Set 4mA value
- signal_average: Signal Average
- display_resolution: Display Resolution
  > e.g. xx.xx
- select_scale: Select Scale
  > Choose 0-20 or 4-20.
- data_log_interval: Data Log Interval
  > Options: 5 or 30 seconds, 1, 2, 5, 10, 15, 30, or 60 minutes.
- reset: Reset

## Diagnostics/Test

- module_information: Module Information
  - software_version: Software Version
  - serial_number: Serial Number
- signals: Signals
  - signal_current: Current
  - count: Count
- calibration_history: Calibration History
  <!-- REVIEW: source lists these flat; I nested "Calibration value" under each calibration type and put Offset and Slope under the 2-point entry -->
  - one_point_value_calibration: 1 point value calibration
    - one_point_calibration_value: Calibration value
  - two_point_value_calibration: 2 point value calibration
    - two_point_calibration_value: Calibration value
    - offset: Offset
    - slope: Slope