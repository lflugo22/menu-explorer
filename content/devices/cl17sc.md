---
device_type: cl17sc
version: "Latest"
label: "CL17sc"
compatible_controllers:
  - sc4500
  - sc200
  - sc1000
controller_labels:
  sc200:
    settings: "CONFIGURE"
    settings.edit_name: "EDIT NAME"
    settings.signal_average: "SIGNAL AVERAGE"
    settings.measurement_type: "MEASUREMENT"
    settings.bubble_reject: "BUBBLE REJECT"
    settings.high_cl_alarm: "HIGH CL ALARM"
    settings.low_cl_alarm: "LOW CL ALARM"
    settings.sensor_info: "SENSOR INFO"
    settings.reset: "DEFAULT SETTINGS"
    settings.service: "SERVICE"
    prime: "PRIME"
    grab_sample: "GRAB SAMPLE IN"
    standard_tasks: "TASKS"
    standard_tasks.clean_cell: "CLEAN CELL"
    standard_tasks.replace_reagents: "CHANGE REAGENTS"
  sc1000:
    settings: "CONFIGURE"
    settings.edit_name: "EDIT NAME"
    settings.signal_average: "SIGNAL AVERAGE"
    settings.measurement_type: "MEASUREMENT"
    settings.bubble_reject: "BUBBLE REJECT"
    settings.high_cl_alarm: "HIGH CL ALARM"
    settings.low_cl_alarm: "LOW CL ALARM"
    settings.sensor_info: "SENSOR INFO"
    settings.reset: "DEFAULT SETTINGS"
    settings.service: "SERVICE"
    prime: "PRIME"
    grab_sample: "GRAB SAMPLE IN"
    standard_tasks: "TASKS"
    standard_tasks.clean_cell: "CLEAN CELL"
    standard_tasks.replace_reagents: "CHANGE REAGENTS"
---

<!-- REVIEW: No explicit firmware version found in the manual. Document is Edition 9, 01/2025 (DOC023.97.80614). Version set to "unknown". -->
<!-- REVIEW: The CL17sc does not have an on-device display or keypad; all menu access is through the connected SC Controller. The menu structure below represents the analyzer's entries as accessed via the controller. -->
<!-- REVIEW: The SC4500 top-level path is: select device tile → Device menu → [option]. The SC200/SC1000 path is: main menu → SENSOR SETUP → [select analyzer] → [option]. Keys are derived from the SC4500 label text. SC200/SC1000 label differences are captured in controller_labels above. -->

## Device Menu
> The analyzer menu is accessed through the connected SC Controller. On the SC4500, select the device tile then choose Device menu. On SC200/SC1000, go to the main menu then select SENSOR SETUP and select the analyzer.

### Settings
> Configure the analyzer name, signal averaging, chlorine measurement type, bubble rejection, and alarm setpoints.

- edit_name: Edit Name
  > Sets the display name of the analyzer shown on the controller and in log files.
- signal_average: Signal Average
  > Sets the number of consecutive measurements used to calculate the displayed average; options are 1 (averaging disabled), 2, 3, or Irregular Value (which rejects readings unusually higher or lower than recent values, holding the last good reading for up to three consecutive rejections).
- measurement_type: Measurement Type
  > Sets the type of chlorine measured: Free Chlorine (default) or Total Chlorine — select to match the label on the installed reagent bottles.
- bubble_reject: Bubble Reject
  > Enables or disables bubble rejection (Yes/No, default No) to reduce signal noise caused by air bubbles in the sample.
- high_cl_alarm: High Chlorine Alarm Limit
  > Sets the chlorine concentration threshold that triggers a high chlorine alarm; range 0.00–10.00 mg/L (default 4.00 mg/L).
- low_cl_alarm: Low Chlorine Alarm Limit
  > Sets the chlorine concentration threshold that triggers a low chlorine alarm; range 0.00–10.00 mg/L (default 0.20 mg/L).
- sensor_info: Sensor Information
  > Displays the analyzer serial number, software version, boot version, and driver version.
- reset: Reset
  > Select Yes to restore all configuration settings to factory default values.
- service: Service
  > For service use only.

### Prime Reagents
> Fills the reagent tubing and removes air from the lines; required after installation or reagent bottle replacement.

### Grab Sample
> Adds a water sample or chlorine standard solution directly to the cell for measurement, used to verify analyzer performance or measure a sample collected from another location.

### Standard Tasks

- clean_cell: Cell Cleaning
  > Stops measurements and prompts the user to manually clean the colorimetric cell with sulfuric acid solution and cotton swabs; outputs can be held at last value or transferred during the task.
- replace_reagents: Replace Reagents
  > Stops measurements and guides the user through replacing the buffer and indicator reagent bottles; outputs can be held at last value or transferred during the task.
