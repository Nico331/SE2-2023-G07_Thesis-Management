# RETROSPECTIVE 04 (Team 07)

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- Number of stories committed vs. done:<span style="color:green"> 27 committed and 27 done
- Total points committed vs. done: <span style="color:green">53 committed and 53 done
- Nr of hours planned vs. spent (as a team):<span style="color:green"> 116h planned and 113h 30m done

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
| ----- | ------- | ------ | ---------- | ------------ |
| _#0_  | 24      |        | 68h 15m    | 68h 10m      |
| _#17_ | 2       | 3      | 45m        | 45m          |
| _#18_ | 1       | 3      | 30m        | 30m          |
| _#19_ | 1       | 5      | 15m        | 20m          |
| _#20_ | 4       | 3      | 3h 30m     | 4h           |
| _#21_ | 1       | 1      | 15m        | 20m          |
| _#22_ | 1       | 1      | 15m        | 15m          |
| _#23_ | 1       | 0      | 30m        | 30m          |
| _#24_ | 1       | 1      | 15m        | 10m          |
| _#25_ | 1       | 0      | 30m        | 30m          |
| _#26_ | 1       | 0      | 30m        | 30m          |
| _#27_ | 2       | 5      | 30m        | 35m          |
| _#28_ | 4       | 3      | 7h         | 5h 30m       |
| _#29_ | 1       | 3      | 15m        | 5m           |
| _#30_ | 3       | 5      | 4h 30m     | 4h 35m       |
| _#31_ | 8       | 3      | 8h 30m     | 8h 30m       |
| _#32_ | 1       | 1      | 15m        | 10m          |
| _#33_ | 4       | 2      | 8h 15m     | 7h 35m       |
| _#34_ | 1       | 1      | 15m        | 15m          |
| _#35_ | 1       | 0      | 30m        | 30m          |
| _#36_ | 2       | 2      | 2h 15m     | 1h 45m       |
| _#37_ | 1       | 1      | 1h 30m     | 1h           |
| _#38_ | 2       | 3      | 3h         | 2h 30m       |
| _#39_ | 2       | 2      | 2h         | 3h           |
| _#40_ | 1       | 1      | 15m        | 10m          |
| _#41_ | 1       | 2      | 1h         | 1h           |
| _#42_ | 1       | 1      | 15m        | 15m          |
| _#43_ | 1       | 1      | 15m        | 5m           |

<span style="color:green">
Note that the story id is consistent with the one on YouTrack, but not with the one provided by the professors.</span>

<span style="color:green">
Moreover the #102 for some reason was not counted in the reports.</span>

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual)
  - Estimate:
    - Average = 1h 34m
    - Standard deviation = 2h 9m
  - Actual:
    - Average = 1h 32m
    - Standard deviation = 2h 19m
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1 : 116 / 113,5 - 1 = 0.02

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated: 5h 15m
  - Total hours spent: 5h 15m
  - Nr of automated unit test cases: 217
  - Coverage (if available): 55,9% (back-end)
- E2E testing:
  - Total hours estimated: 5h 45m
  - Total hours spent: 7h 10m
- Code review:
  - Total hours estimated : 4h
  - Total hours spent: 2h 25m
- Technical Debt management:
  - Total hours estimated: 12h (Tasks: Improve test coverage, remove duplicated code, mobile responsitivity)
  - Total hours spent: 19h 20m
  - Hours estimated for remediation by SonarQube:
    - Remediation effort: 0 (Reliability) + 0h (Security) + 1d 2h (Maintainability) = 3d 2h
  - Hours estimated for remediation by SonarQube only for the selected and planned issues: 7h
  - Hours spent on remediation: 8h 50m (The Sonarcube report have gone from 1d 2h to 3d 2h to 2d 3h)
  - debt ratio (as reported by SonarQube under "Measures-Maintainability"): 0,4 %
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability ):
    - Reliability: A
    - Security: A
    - Maintainability: A
      (Modified after the retrospective feedback from the professor)
-Frontend automated tests:
  - Total hours estimated: 10h
  - Total hours spent: 10h
  - Nr of automated unit test cases: 16


## ASSESSMENT

- What caused your errors in estimation (if any)?

> Due to the experience acquired in the previous sprints we didn't get outstanding errors.

- What lessons did you learn (both positive and negative) in this sprint?

> During this sprint we have learnt that is better to finish the stories some time before the deadline in order to have some days to test the system.

> Next time we could get involved right from the beginning not to write duplicated or dirty code it could be a good way to save much time.

- Which improvement goals set in the previous retrospective were you able to achieve?

> The entire environment was built in time for the demo and worked properly.

> During this sprint we didn't lose much time fixing bugs and possible problems.

> We have tested the application properly.

- Which ones you were not able to achieve? Why?

> We think that we achieved the improvement goals set in the previous sprint.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

> For the next sprint we could commit less stories and put more focus on testing.

- One thing you are proud of as a Team!

> We have committed a lot of stories without exceeding the sprint working hours.
