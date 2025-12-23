import { Level, QuestionType } from '../types';

export const LEVELS: Level[] = [
  {
    id: 'L1',
    title: 'The Foundations',
    description: 'Master the basics of State and Federal case citations.',
    icon: 'Gavel',
    color: 'bg-blue-600',
    requiredXp: 0,
    questions: [
      {
        id: 'q1-1',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'Which of the following is the correct structure for a standard case citation under Rule 10?',
        options: [
          'Case Name, Volume Reporter Page (Court Year).',
          'Volume Reporter Page, Case Name (Court Year).',
          'Case Name (Court Year), Volume Reporter Page.',
          'Reporter Volume Page, Case Name (Year Court).'
        ],
        correctOptionIndex: 0,
        explanation: 'Rule 10.1 requires the order: Case Name, Volume Number, Reporter Abbreviation, First Page, and then the Parenthetical containing Court and Year.',
        ruleReference: 'Rule 10.1'
      },
      {
        id: 'q1-2',
        type: QuestionType.BUILD_CITATION,
        prompt: 'Construct the correct citation for the U.S. Supreme Court case: Brown versus Board of Education, decided in 1954, found in volume 347 of the United States Reports at page 483.',
        citationSegments: ['Brown v. Bd. of Educ.,', '347', 'U.S.', '483', '(1954).'],
        distractorSegments: ['Brown v. Board of Education,', 'US', 'S. Ct.', '1954', '(U.S. 1954).'],
        explanation: '"Board of Education" must be abbreviated to "Bd. of Educ." per Rule 10.2.2. "United States Reports" is abbreviated "U.S.". The court is omitted from the parenthetical when it is clear from the reporter (Rule 10.4(a)).',
        ruleReference: 'Rule 10.2, 10.4'
      },
      {
        id: 'q1-3',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'Which reporter citation is preferred for a recent New York Court of Appeals case if available?',
        options: [
          'N.E.3d (North Eastern Reporter)',
          'N.Y.3d (New York Reports)',
          'N.Y.S.3d (New York Supplement)',
          'Any of the above are equal.'
        ],
        correctOptionIndex: 0,
        explanation: 'According to Table T1, you should generally cite to the regional reporter (N.E.3d) if available for state cases, unless a local rule specifies otherwise. However, for the purpose of general Bluebook rules (academic citation), regional reporters are preferred.',
        ruleReference: 'Table T1'
      },
      {
        id: 'q1-4',
        type: QuestionType.BUILD_CITATION,
        prompt: 'Assemble the citation for: Smith v. Jones, 9th Circuit Court of Appeals, 2020, Volume 950, Federal Reporter 3rd Series, Page 123.',
        citationSegments: ['Smith v. Jones,', '950', 'F.3d', '123', '(9th Cir. 2020).'],
        distractorSegments: ['(9th Cir., 2020).', 'F. 3d', 'Fed. Rep.', 'CA9'],
        explanation: 'The Ninth Circuit is abbreviated "9th Cir." in the parenthetical. There is no comma between the court and the year.',
        ruleReference: 'Rule 10.4'
      }
    ]
  },
  {
    id: 'L2',
    title: 'The Parties',
    description: 'Businesses, Governments, and Multiple Parties.',
    icon: 'Users',
    color: 'bg-emerald-600',
    requiredXp: 500,
    questions: [
      {
        id: 'q2-1',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'How should "The Coca-Cola Company" be cited in a case name?',
        options: [
          'The Coca-Cola Company',
          'Coca-Cola Company',
          'Coca-Cola Co.',
          'The Coca-Cola Co.'
        ],
        correctOptionIndex: 2,
        explanation: 'Rule 10.2.1(d) requires omitting "The" as the first word of a party name (with exceptions for object in rem). Rule 10.2.1(h) requires abbreviating "Company" to "Co.".',
        ruleReference: 'Rule 10.2.1'
      },
      {
        id: 'q2-2',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'A case is named "State of Texas v. Johnson". How should it be cited?',
        options: [
          'State of Texas v. Johnson',
          'State v. Johnson',
          'Texas v. Johnson',
          'Tex. v. Johnson'
        ],
        correctOptionIndex: 2,
        explanation: 'Rule 10.2.1(f): When a state is a party, use "People", "State", or "Commonwealth" only if citing an opinion of a court *within* that state. If citing to a federal court or another state\'s court, use the state name (Texas). Without knowing the court, "Texas v. Johnson" is the safer standard answer for general identification, but specifically: use "State" only if in Texas state court. However, the most famous case is Texas v. Johnson (U.S. Supreme Court), where the state name is used.',
        ruleReference: 'Rule 10.2.1(f)'
      },
      {
        id: 'q2-3',
        type: QuestionType.BUILD_CITATION,
        prompt: 'Cite: American Civil Liberties Union versus United States Department of Justice.',
        citationSegments: ['ACLU', 'v.', 'U.S. Dep\'t of Just.'],
        distractorSegments: ['Am. Civil Liberties Union', 'American Civil Liberties Union', 'United States Department of Justice', 'Dept.', 'Just.'],
        explanation: 'Rule 10.2.1(c): Use widely recognized initials like ACLU. Rule 10.2.2: Abbreviate Department ("Dep\'t") and Justice ("Just.") in case names.',
        ruleReference: 'Rule 10.2.1(c) & 10.2.2'
      },
      {
        id: 'q2-4',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'What happens if there are three plaintiffs listed in the case header?',
        options: [
          'List all three separated by commas.',
          'List the first plaintiff followed by "et al."',
          'List only the first plaintiff.',
          'List the first plaintiff and the first defendant.'
        ],
        correctOptionIndex: 2,
        explanation: 'Rule 10.2.1(a): Omit all parties other than the first listed on each side. Never use "et al." in a case citation (unlike specific rules for books/periodicals).',
        ruleReference: 'Rule 10.2.1(a)'
      }
    ]
  },
  {
    id: 'L3',
    title: 'Precision & Detail',
    description: 'Pinpoints, Procedural Phrases, and Reporters.',
    icon: 'Target',
    color: 'bg-purple-600',
    requiredXp: 1200,
    questions: [
      {
        id: 'q3-1',
        type: QuestionType.BUILD_CITATION,
        prompt: 'Add a pinpoint citation to page 255 for the case: Palsgraf v. Long Island R.R. Co., 162 N.E. 99 (N.Y. 1928).',
        citationSegments: ['Palsgraf v. Long Island R.R. Co.,', '162 N.E.', '99,', '255', '(N.Y. 1928).'],
        distractorSegments: ['at 255', 'p. 255', 'Page 255', '162 N.E. 99'],
        explanation: 'Rule 10.8.3: Add the page number of the specific material after the first page of the case, separated by a comma. Do not use "p." or "at" unless the page number could be confused with another part of the citation.',
        ruleReference: 'Rule 10.8.3'
      },
      {
        id: 'q3-2',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'How do you cite a dissenting opinion in a short form?',
        options: [
          'Id. (Smith, J., dissenting).',
          'Id. at 105 (Smith, J., dissenting).',
          'Id. at 105 (dissenting opinion).',
          'Smith, J., dissenting, at 105.'
        ],
        correctOptionIndex: 1,
        explanation: 'Rule 10.9 (Short Forms) combined with Rule 10.6 (Parenthetical Information). You indicate the specific page and include the parenthetical indicating the weight of authority (dissenting) and the author if relevant.',
        ruleReference: 'Rule 10.9 & 1.6'
      },
      {
        id: 'q3-3',
        type: QuestionType.BUILD_CITATION,
        prompt: 'Cite a case where the United States is a party "ex rel." Gerald Mayo.',
        citationSegments: ['United States', 'ex rel.', 'Mayo', 'v. Satan'],
        distractorSegments: ['United States ex rel Mayo', 'ex. rel.', '(Mayo)', 'on behalf of'],
        explanation: 'Rule 10.2.1(b): Procedural phrases like "ex rel." are retained. "ex rel." should be italicized.',
        ruleReference: 'Rule 10.2.1(b)'
      }
    ]
  },
  {
    id: 'L4',
    title: 'Advanced Scenarios',
    description: 'Unreported, Parallel, and Public Domain citations.',
    icon: 'Zap',
    color: 'bg-amber-600',
    requiredXp: 2000,
    questions: [
      {
        id: 'q4-1',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'Which is the correct format for an unreported case available on Westlaw?',
        options: [
          'Name, Docket No., Database ID (Court Date).',
          'Name, Database ID, Docket No. (Court Date).',
          'Name, Volume Reporter Page (Court Date).',
          'Name, Date, Docket No. (Court).'
        ],
        correctOptionIndex: 0,
        explanation: 'Rule 10.8.1(a): Cite the case name, docket number, database identifier (e.g., 2024 WL 123456), and parenthetical with court and full date.',
        ruleReference: 'Rule 10.8.1(a)'
      },
      {
        id: 'q4-2',
        type: QuestionType.BUILD_CITATION,
        prompt: 'Construct a public domain citation for a South Dakota Supreme Court case from 2005, number 12, paragraph 15.',
        citationSegments: ['State v. Allied', '2005 SD 12,', '¶ 15,', '601 N.W.2d 6.'],
        distractorSegments: ['2005 S.D. 12', 'para. 15', 'at 15', 'SDSC'],
        explanation: 'Rule 10.3.3: Use the public domain format if the jurisdiction has adopted it. South Dakota uses "Year SD CaseNo". Pinpoints are to paragraphs (¶). Parallel citation to regional reporter is typically required if available.',
        ruleReference: 'Rule 10.3.3'
      },
      {
        id: 'q4-3',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'When are parallel citations required?',
        options: [
          'Always.',
          'Never, under the Bluebook.',
          'Only in documents submitted to state courts that require them.',
          'Only for Supreme Court cases.'
        ],
        correctOptionIndex: 2,
        explanation: 'Rule 10.3.1: In academic writing (law review), parallel citations are generally not used. However, practitioners submitting documents to state courts must follow local rules, which often require parallel citations.',
        ruleReference: 'Rule 10.3.1'
      }
    ]
  },
  {
    id: 'L5',
    title: 'History & Weight',
    description: 'Subsequent history and Weight of Authority.',
    icon: 'Scale',
    color: 'bg-red-700',
    requiredXp: 3000,
    questions: [
      {
        id: 'q5-1',
        type: QuestionType.BUILD_CITATION,
        prompt: 'Cite a Court of Appeals case that was affirmed by the Supreme Court.',
        citationSegments: ['X v. Y,', '100 F.3d 50', '(2d Cir. 1996),', 'aff\'d,', '520 U.S. 10', '(1997).'],
        distractorSegments: ['affirmed by', 'affd', 'cert. denied', '(2d Cir. 1996)'],
        explanation: 'Rule 10.7: Give the entire subsequent history. "aff\'d" is abbreviated. The Supreme Court citation follows.',
        ruleReference: 'Rule 10.7'
      },
      {
        id: 'q5-2',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'Which subsequent history must generally be omitted?',
        options: [
          'Affirmed',
          'Reversed',
          'Certiorari denied (denials of cert) unless relevant to the point or recent (last 2 years).',
          'Vacated'
        ],
        correctOptionIndex: 2,
        explanation: 'Rule 10.7: Denials of certiorari ("cert. denied") are generally omitted unless the decision is less than two years old or the denial is particularly significant.',
        ruleReference: 'Rule 10.7'
      },
      {
        id: 'q5-3',
        type: QuestionType.BUILD_CITATION,
        prompt: 'Cite a case quoting another case. (Quoting X v. Y).',
        citationSegments: ['Alpha v. Beta,', '100 U.S. 1,', '5', '(2000)', '(quoting X v. Y, 50 U.S. 20, 25 (1950)).'],
        distractorSegments: ['(citing X v. Y)', 'quoting', 'citation omitted'],
        explanation: 'Rule 10.6.2: When a case directly quotes another, use a parenthetical starting with "(quoting ...)".',
        ruleReference: 'Rule 10.6.2'
      }
    ]
  },
  {
    id: 'L6',
    title: 'The Partner\'s Review',
    description: 'Final Verification: Demonstrate mastery of case law citations in this cumulative review.',
    icon: 'Briefcase',
    color: 'bg-slate-800',
    requiredXp: 4000,
    questions: [
      {
        id: 'q6-1',
        type: QuestionType.SIMULATION,
        prompt: 'Correct the case name abbreviations and reporter format in this Supreme Court citation.',
        caseFile: {
          title: 'Federal Election Commission versus Wisconsin Right to Life, Incorporated',
          court: 'U.S. Supreme Court',
          date: '2007',
          source: '551 U.S. 449',
          facts: 'Challenge to the Bipartisan Campaign Reform Act of 2002 regarding corporate campaign expenditures.'
        },
        simulationTokens: [
          { id: 't1', display: 'Federal Election Commission', options: ['Federal Election Commission', 'Fed. Election Comm\'n', 'Fed. Elec. Comm\'n'], correct: 'Fed. Election Comm\'n', isLocked: false },
          { id: 't2', display: 'v.', options: ['v.'], correct: 'v.', isLocked: true },
          { id: 't3', display: 'Wisconsin Right to Life, Inc.,', options: ['Wisconsin Right to Life, Inc.,', 'Wis. Rt. to Life, Inc.,', 'Wis. Right to Life, Inc.,'], correct: 'Wis. Right to Life, Inc.,', isLocked: false },
          { id: 't4', display: '551 S. Ct. 449', options: ['551 U.S. 449', '551 S. Ct. 449', '551 U.S. Rep. 449'], correct: '551 U.S. 449', isLocked: false },
          { id: 't5', display: '(2007).', options: ['(2007).'], correct: '(2007).', isLocked: true }
        ],
        explanation: 'The correct citation is: Fed. Election Comm\'n v. Wis. Right to Life, Inc., 551 U.S. 449 (2007). Three specific fixes are needed: 1) "Commission" must be abbreviated to "Comm\'n" (Rule 10.2.1(c)); 2) "Wisconsin" must be abbreviated to "Wis." (Table T10); and 3) cite the official "U.S." reporter, not "S. Ct.", when available (Rule 10.4).',
        ruleReference: 'Rule 10.2.1(c), T10, Rule 10.4'
      },
      {
        id: 'q6-2',
        type: QuestionType.BUILD_CITATION,
        prompt: 'Build the citation for a case where the State of Georgia is a party, heard in the Georgia Court of Appeals.',
        citationSegments: ['State v. Smith,', '201 Ga. App. 10,', '410 S.E.2d 12', '(1991).'],
        distractorSegments: ['Georgia v. Smith,', 'Ga. v. Smith,', '(Ga. Ct. App. 1991).', '201 Georgia App. 10,'],
        explanation: 'The correct citation is: State v. Smith, 201 Ga. App. 10, 410 S.E.2d 12 (1991). Use "State" (not the state name "Georgia") because the case is decided by a court of that state (Rule 10.2.1(f)). While academic writing often prefers just the regional reporter, parallel citations (Ga. App.) are shown here as they are common in state practice.',
        ruleReference: 'Rule 10.2.1(f)'
      },
      {
        id: 'q6-3',
        type: QuestionType.SIMULATION,
        prompt: 'Correct the subsequent history in this citation. (Certiorari was denied in 2010).',
        caseFile: {
          title: 'United States v. O\'Brien',
          court: 'First Circuit',
          date: '2008',
          source: '542 F.3d 921',
          history: 'Supreme Court denied certiorari in 2010.',
          facts: 'Criminal case involving machine gun statutes.'
        },
        simulationTokens: [
          { id: 't1', display: 'United States v. O\'Brien,', options: ['United States v. O\'Brien,'], correct: 'United States v. O\'Brien,', isLocked: true },
          { id: 't2', display: '542 F.3d 921', options: ['542 F.3d 921'], correct: '542 F.3d 921', isLocked: true },
          { id: 't3', display: '(1st Cir. 2008),', options: ['(1st Cir. 2008),'], correct: '(1st Cir. 2008),', isLocked: true },
          { id: 't4', display: 'cert. denied,', options: ['cert. denied,', 'cert denied', '[Remove Text]'], correct: '[Remove Text]', isLocked: false },
          { id: 't5', display: '558 U.S. 1117 (2010).', options: ['558 U.S. 1117 (2010).', '[Remove Text]'], correct: '[Remove Text]', isLocked: false }
        ],
        explanation: 'The correct citation is: United States v. O\'Brien, 542 F.3d 921 (1st Cir. 2008). Under Rule 10.7, denial of certiorari ("cert. denied") must be omitted if the denial is more than two years old. Since 2010 is older than two years, the history must be removed entirely.',
        ruleReference: 'Rule 10.7'
      },
      {
        id: 'q6-4',
        type: QuestionType.BUILD_CITATION,
        prompt: 'Build the citation for a case involving a railroad company.',
        citationSegments: ['BNSF Ry. Co.', 'v.', 'Loos,', '586 U.S. 1', '(2019).'],
        distractorSegments: ['BNSF Railway Co.', 'BNSF Ry.', 'Railway Company', 'Ry. Company'],
        explanation: 'The correct citation is: BNSF Ry. Co. v. Loos, 586 U.S. 1 (2019). "Railway" must be abbreviated to "Ry." and "Company" to "Co." according to Rule 10.2.1(c) and Table T6. Abbreviations in case names are mandatory, not optional.',
        ruleReference: 'Rule 10.2.1(c) & T6'
      },
      {
        id: 'q6-5',
        type: QuestionType.SIMULATION,
        prompt: 'Final Review: Correct any errors in this unreported case citation.',
        caseFile: {
          title: 'Jones v. Smith',
          court: 'N.D. Cal.',
          date: 'Feb 14, 2022',
          source: '2022 WL 12345',
          facts: 'Discovery dispute.'
        },
        simulationTokens: [
          { id: 't1', display: 'Jones v. Smith,', options: ['Jones v. Smith,'], correct: 'Jones v. Smith,', isLocked: true },
          { id: 't2', display: 'Docket No. 21-cv-100,', options: ['No. 21-cv-100,', 'Docket No. 21-cv-100,', 'Docket 21-cv-100,'], correct: 'No. 21-cv-100,', isLocked: false },
          { id: 't3', display: '2022 WL 12345', options: ['2022 WL 12345'], correct: '2022 WL 12345', isLocked: true },
          { id: 't4', display: '(N.D. Cal. 2022).', options: ['(N.D. Cal. 2022).', '(N.D. Cal. Feb. 14, 2022).'], correct: '(N.D. Cal. Feb. 14, 2022).', isLocked: false }
        ],
        explanation: 'The correct citation is: Jones v. Smith, No. 21-cv-100, 2022 WL 12345 (N.D. Cal. Feb. 14, 2022). Unreported cases available on electronic databases (Rule 10.8.1(a)) require the full date (Month Day, Year) in the parenthetical to help locate them. Additionally, docket numbers are always introduced by "No.", not the word "Docket".',
        ruleReference: 'Rule 10.8.1(a)'
      }
    ]
  }
];