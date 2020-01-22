**vsa Component**

This component can be used to show very short Answer Questions in Quml Player. It receives questions and layout emits component Loaded.
  

**Selector**: `quml-vsa`

  

  

**Exported as** : `VsaComponent`

  

  

### Properties

  
| Name     |  Description  |
|----------|:-------------:|
| @Input() identifier |  Unique identifier for the question |
| @Input() questions | Dataset to display the very short answer questions in the Quml Player|    |
| @Input() layout: string | Layout to display the questions in different formats. Ex: Default, Column, Multiple|


  

### Events

| Name     |  Description  |
|----------|:-------------:|
| @Output() componentLoaded | Emits this event when user loads the component.|