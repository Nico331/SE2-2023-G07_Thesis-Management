# RETROSPECTIVE 03 (Team 07)

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- Number of stories committed vs. done:<span style="color:green"> 9 committed and 7 done
- Total points committed vs. done: <span style="color:green">35 committed and 27 done
- Nr of hours planned vs. spent (as a team):<span style="color:green"> 112h planned and 115h done

**Remember** a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD if required (you cannot remove items!)

<span style="color:green">
All the unit and e2e tests for the completed stories are passing.
</span>

### Detailed statistics

| Story | # Tasks | Points | Hours est. | Hours actual |
| ----- | ------- | ------ |------------|--------------|
| _#0_  | 28      |        | 66h        | 72h 15m      |
| _#10_  | 1       | 8      | 6h         | 3h           |
| _#12_  | 2       | 2      | 3h         | 3h           |
| _#13_  | 3       | 3      | 3h         | 3h 30m       |
| _#14_  | 1       | 3      | 1h         | 1h           |
| _#15_  | 1       | 5      | 1h         | 30m          |
| _#16_  | 1       | 3      | 2h         | 1h           |
| _#17_ (NC)  | 3/4       | 3      | 6h         | 7h 30m       |
| _#115_  | 3       | 3      | 9h         | 9h           |
| _#116_ (NC)  | 4/7       | 5      | 15h        | 15h 15m      |

<span style="color:green">
Note that the story id is consistent with the one on YouTrack, but not with the one provided by the professors.</span>

<span style="color:green">
Moreover the #102 for some reason was not counted in the reports.</span>


> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual)
    - Estimate:
        - Average = 2h 14m
        - Standard deviation = 2h 9m
    - Actual:
        - Average = 2h 20m
        - Standard deviation = 2h 3m
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1 : 110 / 115 - 1 = - 0.04

## QUALITY MEASURES

- Unit Testing:
    - Total hours estimated: 7h 30m
    - Total hours spent: 7h
    - Nr of automated unit test cases: 65
    - Coverage (if available):
- E2E testing:
    - Total hours estimated: 4h
    - Total hours spent: 6h
- Code review:
    - Total hours estimated : 2h
    - Total hours spent: 2h

## ASSESSMENT

- What caused your errors in estimation (if any)?

 > Due to the experience acquired in the previous sprints we didn't get outstanding errors.

- What lessons did you learn (both positive and negative) in this sprint?

 > We have to test better a task before committing it.

 > If something isn't working properly (a story not completed) better not to show it during the demo.

 > Build the environment some time before the demo.

- Which improvement goals set in the previous retrospective were you able to achieve?

 > We have prepared some realistic test data for the demo.

 > The tasks have been split properly between team members, in particular the mole of work for backend was
 > approximately equal to the one for frontend.

 > We are trying to consider also the technical debt when we plan the sprint.

- Which ones you were not able to achieve? Why?

 > We think that we achieved the improvement goals set in the previous sprint.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

 > For the next sprint we must test the entire system and prepare the environment some hour before the demo.

 > The frontend team have to manage in a better way the errors in order not to lose much time when some problem arises.

- One thing you are proud of as a Team!

 > The communication between team members is getting better and better.

 > We have completed a lot of stories during this sprint.
