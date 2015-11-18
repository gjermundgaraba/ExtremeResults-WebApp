# Data model for Extreme Results Apps
This data structure needs to be in Parse for the WebApp to work.

I reccomend reading a bit about Parse before using it.
Their documentation is very good.


## User
Normal standard Parse user, no extra fields

## Outcome
Custom class for Outcomes (Daily, Weekly, etc.)

Extra fields:
* typeName: String
* firstStory: String
* secondStory: String
* thirdStory: String
* effectiveDate: Date


## Reflection
Custom class for Reflections (Weekly, Monthly, etc.)

Extra fields:
* typeName: String
* firstThingThatWentWell: String
* secondThingThatWentWell: String
* thirdThingThatWentWell: String
* firstThingToImprove: String
* secondThingToImprove: String
* thirdThingToImprove: String
* effectiveDate: String
