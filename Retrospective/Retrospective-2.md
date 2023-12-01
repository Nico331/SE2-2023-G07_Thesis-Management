# TEMPLATE FOR RETROSPECTIVE (Team 07)

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- Number of stories committed vs. done:<span style="color:green"> 4 committed and 4 done
- Total points committed vs. done: <span style="color:green">10 committed and 10 done
- Nr of hours planned vs. spent (as a team):<span style="color:green"> 122h 30m planned and 120h done

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
| _#0_  | 28      |        | 104h       | 104h         |
| _#4_  | 6       | 3      | 7h         | 7h 45m       |
| _#6_  | 2       | 2      | 3h 30m     | 2h 30m       |
| _#7_  | 3       | 2      | 4h         | 2h 30m       |
| _#9_  | 3       | 3      | 4h         | 4h 15m       |

<span style="color:green">
Note that the story id is consistent with the one on YouTrack, but not with the one provided by the professors.
</span>

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual)
  - Estimate:
    - Average = 2h 55m 
    - Standard deviation = 3h 
  - Actual:
    - Average = 2h 50m
    - Standard deviation = 2h 53m
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1 : 122.5 / 120 - 1 = 0.02

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated: 16h
  - Total hours spent: 9h 45m
  - Nr of automated unit test cases: 50
  - Coverage (if available):
- E2E testing:
  - Total hours estimated: 2h
  - Total hours spent: 5h
- Code review:
  - Total hours estimated : 4h
  - Total hours spent: 45m

## ASSESSMENT

- What caused your errors in estimation (if any)?

- What lessons did you learn (both positive and negative) in this sprint?

  > We learnt that the more efficient and effective way to achieve stories is following the point priority order.

  > Tasks we did not work on (0 time spent) are not considered for the estimation report in YouTrack. A possible solution is add a 1m spent time.

- Which improvement goals set in the previous retrospective were you able to achieve?

  > We wrote better and cleaner code.

  > We tested in a deeper way.

  > We managed working time in a better and more homogeneous way during the sprint.

- Which ones you were not able to achieve? Why?

  > The work's organization has not been improved yet in terms of clearer division of work between the team members. This has been due to the fact that we created more backend tasks than the frontend ones. Change a role member (frontend to backend) would have been more expensive (because of the training and learning time required).

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  > For the next demo presentation, we should prepare some realistic test data.

  > We should manage and reduce the technical debt.

- One thing you are proud of as a Team!

  > We are getting to know each other better and beginning to trust each others skills more.
