export interface UseCase {
  slug: string;
  title: string;
  headline: string;
  metaDescription: string;
  intro: string;
  beforeTitle: string;
  beforeText: string;
  afterTitle: string;
  afterText: string;
  commands: Array<{ label: string; cmd: string; description: string }>;
  scenario: {
    title: string;
    steps: string[];
  };
  cardDescription: string;
  cardCmd: string;
}

export const useCases: UseCase[] = [
  {
    slug: 'qa-testing',
    title: 'QA Testing with AI Agents',
    headline: 'Test any macOS app with AI agents',
    metaDescription: 'Use Agent Vision to let AI agents QA test native macOS applications. Discover buttons, fill forms, verify UI states, and report bugs across any app — not just browsers.',
    intro: 'Browser-based testing tools like Puppeteer and Playwright only work in the browser. But your users interact with native apps, desktop software, and simulators. Agent Vision lets AI agents test any macOS application the same way a human would — by looking at the screen, finding elements, and interacting with them.',
    beforeTitle: 'Without Agent Vision',
    beforeText: 'Your AI agent can only test web apps. Native macOS applications, iOS Simulators, Electron apps, and desktop software are invisible. QA for these requires manual testing or fragile AppleScript hacks that break whenever the UI changes. You maintain separate test approaches for web and native, doubling your effort.',
    afterTitle: 'With Agent Vision',
    afterText: 'Your AI agent screenshots the app, discovers every button, label, and input field through the macOS Accessibility API, then interacts with them using precise coordinates. It works the same whether the target is Safari, Xcode, Figma, or your custom SwiftUI app. One approach for everything on screen.',
    commands: [
      {
        label: 'Start a session targeting the app window',
        cmd: 'agent-vision start --region 0,0,1440,900',
        description: 'Lock onto a screen region. Agent Vision tracks this region across captures.',
      },
      {
        label: 'Capture the current state',
        cmd: 'agent-vision capture --session $SID --format png',
        description: 'Take a screenshot your AI agent can analyze. Returns a PNG path.',
      },
      {
        label: 'Discover all interactive elements',
        cmd: 'agent-vision elements --session $SID',
        description: 'Returns every button, text field, link, and label with coordinates and accessibility info.',
      },
      {
        label: 'Filter for specific element types',
        cmd: 'agent-vision elements --session $SID --filter button',
        description: 'Narrow discovery to just buttons, inputs, or any specific element type.',
      },
      {
        label: 'Click a discovered element',
        cmd: 'agent-vision click --element el-btn-001 --session $SID',
        description: 'Interact with an element by its discovered ID. Coordinates are mapped automatically.',
      },
      {
        label: 'Re-capture to verify the result',
        cmd: 'agent-vision capture --session $SID',
        description: 'After acting, screenshot again to verify the UI changed as expected.',
      },
    ],
    scenario: {
      title: 'Example: Testing a login flow in an iOS Simulator',
      steps: [
        'AI agent starts an Agent Vision session targeting the Simulator window',
        'Captures a screenshot and identifies the email field, password field, and login button',
        'Types test credentials into each field using agent-vision type',
        'Clicks the login button using agent-vision click',
        'Re-captures and verifies the dashboard screen loaded (no error banners, expected elements present)',
        'Reports pass/fail with annotated screenshots as evidence',
      ],
    },
    cardDescription: 'Let your AI agent test any native app. It finds buttons, fills forms, verifies states, and reports bugs — across apps that browser-based tools can\'t touch.',
    cardCmd: 'agent-vision elements --session $SID --filter button',
  },
  {
    slug: 'form-automation',
    title: 'Form Automation with AI Agents',
    headline: 'Fill forms in any app with AI agents',
    metaDescription: 'Automate form filling across any macOS application with Agent Vision. Discover input fields, type values, tab between them, and submit — no app-specific scripting required.',
    intro: 'Forms exist everywhere — CRM tools, admin panels, native desktop apps, government portals, legacy enterprise software. Agent Vision lets AI agents discover input fields in any application, type values into them, navigate between fields, and submit. No app-specific APIs or integrations needed.',
    beforeTitle: 'Without Agent Vision',
    beforeText: 'Automating forms means writing custom scripts per application. Selenium for web forms, AppleScript for native Mac apps (unreliably), and nothing at all for many enterprise desktop tools. Each integration is fragile, app-specific, and breaks on UI updates. Cross-app workflows (copy from spreadsheet, paste into web form) require stitching together completely different automation frameworks.',
    afterTitle: 'With Agent Vision',
    afterText: 'Your AI agent sees the form the same way a human does. It discovers all input fields, labels, dropdowns, and buttons through the Accessibility API. It types into fields by element ID, tabs between them, selects dropdown values, and clicks submit. The same commands work whether the form is in Chrome, a native Mac app, or an Electron-based tool.',
    commands: [
      {
        label: 'Discover all form fields',
        cmd: 'agent-vision elements --session $SID --filter textfield',
        description: 'Find every text input, textarea, and editable field in the current view.',
      },
      {
        label: 'Type into a specific field',
        cmd: 'agent-vision type --element el-input-002 --text "hello@example.com"',
        description: 'Enter text into a discovered field. Agent Vision focuses the field and types without stealing your cursor.',
      },
      {
        label: 'Clear a field before typing',
        cmd: 'agent-vision type --element el-input-002 --text "" --clear',
        description: 'Clear existing content before entering new text.',
      },
      {
        label: 'Tab to the next field',
        cmd: 'agent-vision key --key tab --session $SID',
        description: 'Send keyboard events to navigate between form fields.',
      },
      {
        label: 'Submit the form',
        cmd: 'agent-vision click --element el-btn-submit --session $SID',
        description: 'Click the submit button after filling all fields.',
      },
    ],
    scenario: {
      title: 'Example: Filling an expense report in a desktop app',
      steps: [
        'AI agent captures the expense form window and discovers all input fields',
        'Reads field labels to understand which field is "Amount", "Date", "Category", "Description"',
        'Types the expense amount into the amount field',
        'Selects the date using the date picker',
        'Chooses a category from the dropdown',
        'Enters a description in the notes field',
        'Clicks "Submit" and re-captures to verify the success confirmation',
      ],
    },
    cardDescription: 'Discover input fields in any application, type values, tab between them, submit. No app-specific scripting required.',
    cardCmd: 'agent-vision type --element el-input-002 --text "hello@example.com"',
  },
  {
    slug: 'visual-feedback-loops',
    title: 'Visual Feedback Loops for AI Agents',
    headline: 'Give AI agents real-time visual feedback',
    metaDescription: 'Enable AI agents to see what changed after every action with Agent Vision. The capture-analyze-act-recapture loop gives agents a visual feedback mechanism for any macOS app.',
    intro: 'AI agents that can only read text output are flying blind. They execute a command but can\'t see what happened on screen. Agent Vision closes this loop: capture a screenshot, analyze the visual state, decide what to do, act, then capture again to verify. This scan-act-rescan cycle gives AI agents the same visual feedback humans rely on.',
    beforeTitle: 'Without Agent Vision',
    beforeText: 'Your AI agent runs a command and gets text output — maybe an exit code, maybe some logs. But it can\'t see the actual result on screen. Did the button change color? Did the dialog appear? Did the layout shift? The agent is guessing. It can\'t course-correct because it can\'t observe the effect of its own actions.',
    afterTitle: 'With Agent Vision',
    afterText: 'After every action, the agent re-captures the screen. It can compare before and after screenshots, verify that expected elements appeared or disappeared, detect error states visually, and decide its next action based on what it actually sees. The feedback loop is tight: act, observe, adjust. Just like a human.',
    commands: [
      {
        label: 'Capture baseline state',
        cmd: 'agent-vision capture --session $SID --tag before',
        description: 'Take a screenshot before acting. The tag helps your agent track which capture is which.',
      },
      {
        label: 'Perform an action',
        cmd: 'agent-vision click --element el-btn-001 --session $SID',
        description: 'Click, type, scroll — whatever the next step requires.',
      },
      {
        label: 'Re-capture after the action',
        cmd: 'agent-vision capture --session $SID --tag after',
        description: 'Screenshot the result. Your agent compares this with the baseline to verify the change.',
      },
      {
        label: 'Discover new elements that appeared',
        cmd: 'agent-vision elements --session $SID',
        description: 'After a UI change, new elements may appear (modals, error messages, new screens). Discover them.',
      },
      {
        label: 'Loop until the goal is reached',
        cmd: 'agent-vision capture --session $SID --tag step-3',
        description: 'Each iteration brings the agent closer to its goal. The visual feedback tells it when to stop.',
      },
    ],
    scenario: {
      title: 'Example: AI agent debugging a UI layout issue',
      steps: [
        'Agent captures the current app state and notices a button is overlapping a text field',
        'Agent modifies the CSS in the editor (via its coding tools)',
        'Agent re-captures the app to see if the overlap is fixed',
        'The overlap persists — agent adjusts the margin value and saves again',
        'Agent captures once more and confirms the layout is correct',
        'Agent moves on to the next visual issue, repeating the cycle',
      ],
    },
    cardDescription: 'Capture a screenshot, analyze the visual state, decide what to do next. The scan-act-rescan loop gives AI agents a real-time visual feedback loop.',
    cardCmd: 'agent-vision capture --session $SID --format png',
  },
  {
    slug: 'multi-app-workflows',
    title: 'Multi-App Workflows with AI Agents',
    headline: 'Automate across apps that were never designed to talk',
    metaDescription: 'Use Agent Vision to let AI agents work across multiple macOS applications. Copy data from spreadsheets, paste into web forms, verify in database tools — bridging apps that have no API integration.',
    intro: 'Real work happens across multiple applications. You copy from a spreadsheet, paste into a CRM, verify in a database tool, then update a project tracker. These apps have no shared API. Agent Vision lets AI agents bridge the gaps by interacting with each application through the screen — the one interface every app shares.',
    beforeTitle: 'Without Agent Vision',
    beforeText: 'Cross-app automation requires each application to have an API, and those APIs need to be compatible. Most desktop apps don\'t have APIs. Enterprise tools have locked-down integrations. Legacy software has nothing. You end up doing it manually: alt-tab, copy, paste, verify, repeat. Hours of mind-numbing screen-shuffling that\'s too irregular to script but too repetitive to enjoy.',
    afterTitle: 'With Agent Vision',
    afterText: 'Your AI agent treats every application as a visual interface it can read and interact with. It screenshots the spreadsheet, reads the values, switches to the CRM, finds the input fields, types the data, switches to the database tool to verify. No APIs required. If a human can do it by looking at the screen and clicking, an AI agent with Agent Vision can do it too.',
    commands: [
      {
        label: 'Start sessions for multiple app windows',
        cmd: 'agent-vision start --region 0,0,720,900 --name spreadsheet',
        description: 'Create named sessions for each application window.',
      },
      {
        label: 'Capture from one app',
        cmd: 'agent-vision capture --session $SHEET_SID',
        description: 'Screenshot the spreadsheet to read the source data.',
      },
      {
        label: 'Switch to another app and discover fields',
        cmd: 'agent-vision elements --session $CRM_SID --filter textfield',
        description: 'Find input fields in the target application.',
      },
      {
        label: 'Type data from source into target',
        cmd: 'agent-vision type --element el-input-001 --text "Acme Corp" --session $CRM_SID',
        description: 'Enter the value read from the spreadsheet into the CRM field.',
      },
      {
        label: 'Verify in a third app',
        cmd: 'agent-vision capture --session $DB_SID',
        description: 'Screenshot the database tool to confirm the record was created.',
      },
    ],
    scenario: {
      title: 'Example: Migrating contacts from a spreadsheet to a CRM',
      steps: [
        'Agent captures the spreadsheet and reads the first row of contact data',
        'Agent switches to the CRM window and discovers the "New Contact" form fields',
        'Agent types the name, email, and phone number into the corresponding fields',
        'Agent clicks "Save" and re-captures to verify the contact was created',
        'Agent switches back to the spreadsheet and moves to the next row',
        'Repeats until all contacts are migrated, logging successes and failures',
      ],
    },
    cardDescription: 'Copy data from a spreadsheet, paste into a web form, verify in a database tool. Agent Vision bridges the gaps between apps that were never designed to talk to each other.',
    cardCmd: 'agent-vision click --element el-btn-003 --session $SID',
  },
  {
    slug: 'ai-controlling-ai',
    title: 'Control Claude with Claude',
    headline: 'Control Claude with Claude',
    metaDescription: 'Use Agent Vision to let one AI agent control another. Claude Code orchestrating another Claude Code instance through its visual terminal interface. AI agents controlling AI agents.',
    intro: 'The meta use case. An AI agent uses Agent Vision to control another AI agent\'s terminal. One Claude Code instance reads the screen of another, types commands, approves prompts, and reviews output. This isn\'t theoretical — we literally built this website using this exact setup. An outer Claude controlled an inner Claude through Agent Vision, watching it code, giving feedback, and iterating on the design.',
    beforeTitle: 'Without Agent Vision',
    beforeText: 'AI agents are isolated. Each one runs in its own terminal, its own context window, its own world. If you want one agent to check another agent\'s work, you copy-paste output between them manually. Orchestrating multiple AI agents means you are the bottleneck — reading one agent\'s output, deciding what to tell the next one, shuttling context back and forth.',
    afterTitle: 'With Agent Vision',
    afterText: 'One AI agent screenshots the other\'s terminal, reads its output, and decides what to do next. It can type commands into the inner agent\'s session, approve or reject its suggestions, and verify the results visually. The outer agent becomes a supervisor with full visual access to the inner agent\'s work. No copy-paste, no manual context shuttling.',
    commands: [
      {
        label: 'Start a session targeting another terminal window',
        cmd: 'agent-vision start --region 0,0,1440,900 --name inner-claude',
        description: 'Lock onto the terminal window where the other Claude Code instance is running.',
      },
      {
        label: 'Capture the inner agent\'s current output',
        cmd: 'agent-vision capture --session $INNER_SID',
        description: 'Screenshot what the other agent is showing. The outer agent can now read and analyze it.',
      },
      {
        label: 'Read the inner agent\'s terminal text',
        cmd: 'agent-vision elements --session $INNER_SID',
        description: 'Discover text elements, buttons, and prompts in the inner agent\'s interface.',
      },
      {
        label: 'Type a command into the inner agent',
        cmd: 'agent-vision type --element el-input-001 --text "fix the header spacing" --session $INNER_SID',
        description: 'Send instructions to the inner Claude Code instance by typing into its prompt.',
      },
      {
        label: 'Approve a prompt or suggestion',
        cmd: 'agent-vision click --element el-btn-approve --session $INNER_SID',
        description: 'Click approve/accept buttons on the inner agent\'s permission prompts.',
      },
      {
        label: 'Re-capture to verify the result',
        cmd: 'agent-vision capture --session $INNER_SID',
        description: 'Check what the inner agent produced. Loop until the result meets your criteria.',
      },
    ],
    scenario: {
      title: 'Example: Outer Claude reviews inner Claude\'s code changes',
      steps: [
        'Outer agent captures the inner Claude\'s terminal and reads its latest code diff',
        'Outer agent analyzes the diff for quality issues and missing edge cases',
        'Outer agent types feedback into the inner Claude\'s prompt: "the error handler is missing a null check"',
        'Inner Claude processes the feedback and proposes a fix',
        'Outer agent re-captures, reviews the updated diff, and approves the change',
        'Outer agent types "commit this" into the inner Claude\'s prompt',
      ],
    },
    cardDescription: 'One Claude controls another Claude through its terminal. AI agents orchestrating AI agents through visual interfaces. We built this site this way.',
    cardCmd: 'agent-vision type --text "fix the header" --session $INNER_SID',
  },
  {
    slug: 'web-app-automation',
    title: 'Automate Any Web App Without an API',
    headline: 'Automate any web app — no API needed',
    metaDescription: 'Use Agent Vision to automate web apps that have no API. Point it at a browser window and control Jira, Notion, Google Forms, or legacy admin panels visually. No API keys, no OAuth, no webhooks.',
    intro: 'Most web apps have terrible APIs, rate-limited APIs, or no APIs at all. Agent Vision doesn\'t need one. Point it at a browser window and interact with the web app the same way a human would — by seeing the page and clicking things. Update Jira tickets, export Notion tables, fill Google Forms, navigate legacy enterprise admin panels. No API keys, no webhooks, no OAuth flows. The last mile automation tool.',
    beforeTitle: 'Without Agent Vision',
    beforeText: 'You need API access for every web app you want to automate. Half the apps don\'t have public APIs. The ones that do require OAuth setup, API keys, rate limit management, and pagination handling. Legacy enterprise tools have internal APIs that IT won\'t give you access to. You end up doing it manually or building brittle Selenium scripts that break every time the CSS changes.',
    afterTitle: 'With Agent Vision',
    afterText: 'Point Agent Vision at the browser window. It discovers buttons, links, form fields, and text on the page through the macOS Accessibility API — no DOM access needed. Your AI agent reads the page visually, clicks buttons, fills forms, and navigates between pages. It works with any web app because it works at the screen level, not the API level.',
    commands: [
      {
        label: 'Target the browser window',
        cmd: 'agent-vision start --region 0,0,1440,900 --name browser',
        description: 'Lock onto your browser window where the web app is open.',
      },
      {
        label: 'Discover page elements',
        cmd: 'agent-vision elements --session $SID',
        description: 'Find all interactive elements on the current page: buttons, links, inputs, dropdowns.',
      },
      {
        label: 'Click a navigation element',
        cmd: 'agent-vision click --element el-link-005 --session $SID',
        description: 'Navigate to a different page or section by clicking links and menu items.',
      },
      {
        label: 'Fill a form field',
        cmd: 'agent-vision type --element el-input-003 --text "PROJ-1234: Bug fix" --session $SID',
        description: 'Type into any input field on the page. Works with search boxes, text areas, and inline editors.',
      },
      {
        label: 'Submit or save',
        cmd: 'agent-vision click --element el-btn-save --session $SID',
        description: 'Click the save/submit/update button to commit the changes.',
      },
    ],
    scenario: {
      title: 'Example: Updating 20 Jira ticket statuses',
      steps: [
        'Agent captures the Jira board in the browser and identifies all ticket cards',
        'Agent clicks the first ticket to open its detail view',
        'Agent discovers the status dropdown and clicks it to reveal options',
        'Agent selects "In Review" from the dropdown list',
        'Agent clicks the back button to return to the board view',
        'Agent repeats for each remaining ticket, re-scanning after every navigation',
      ],
    },
    cardDescription: 'Point Agent Vision at a browser window and control web apps that have no API. Jira, Notion, Google Forms, legacy admin panels. No API keys needed.',
    cardCmd: 'agent-vision click --element el-link-005 --session $SID',
  },
  {
    slug: 'mobile-simulator-testing',
    title: 'Test iOS Apps in the Simulator',
    headline: 'Test iOS apps in the Simulator',
    metaDescription: 'Use Agent Vision to test iOS apps in the Simulator without Appium or XCUITest. Screenshot, discover UI elements, tap, swipe, and verify — all through the macOS screen.',
    intro: 'Testing iOS apps usually means Appium, XCUITest, or 30 minutes of setup before you can run a single test. Agent Vision skips all of that. Select the Simulator window, start scanning, and interact. The drag command handles touch gestures like swipe and scroll. Screenshots verify visual state. Element discovery finds buttons and labels. It\'s the iOS testing tool that doesn\'t require you to be an iOS testing expert.',
    beforeTitle: 'Without Agent Vision',
    beforeText: 'Appium requires a Java environment, WebDriverAgent, and careful version matching between Xcode, Simulator, and the Appium server. XCUITest requires writing Swift test code and running it through Xcode. Both approaches have steep setup costs, flaky device connections, and slow test execution. Quick exploratory testing of a new build means firing up an entire test infrastructure.',
    afterTitle: 'With Agent Vision',
    afterText: 'Start a session pointing at the Simulator window. Agent Vision discovers every button, label, text field, and switch through macOS Accessibility. Tap by clicking, swipe by dragging, type by targeting input fields. Re-capture after every action to verify the result. Your AI agent can test an iOS app flow in minutes without installing any test framework.',
    commands: [
      {
        label: 'Target the Simulator window',
        cmd: 'agent-vision start --region 0,0,430,932 --name simulator',
        description: 'Lock onto the iOS Simulator window. Size matches a standard iPhone frame.',
      },
      {
        label: 'Discover on-screen elements',
        cmd: 'agent-vision elements --session $SID',
        description: 'Find all buttons, labels, text fields, switches, and navigation elements in the Simulator.',
      },
      {
        label: 'Tap a button',
        cmd: 'agent-vision click --element el-btn-login --session $SID',
        description: 'Tap is just a click. Agent Vision translates screen coordinates to the Simulator window.',
      },
      {
        label: 'Swipe to scroll',
        cmd: 'agent-vision drag --from 215,700 --to 215,300 --session $SID',
        description: 'The drag command handles swipe gestures. Drag up to scroll down, drag left to go to the next page.',
      },
      {
        label: 'Type into a text field',
        cmd: 'agent-vision type --element el-input-email --text "test@example.com" --session $SID',
        description: 'Enter text into input fields. Works with the Simulator\'s keyboard input.',
      },
      {
        label: 'Verify the visual state',
        cmd: 'agent-vision capture --session $SID --tag after-login',
        description: 'Screenshot the result and have your AI agent verify the expected screen appeared.',
      },
    ],
    scenario: {
      title: 'Example: Testing a login-to-dashboard flow',
      steps: [
        'Agent targets the Simulator window running the iOS app',
        'Agent discovers the email field, password field, and "Sign In" button on the login screen',
        'Agent types test credentials into both fields',
        'Agent taps "Sign In" and waits briefly for the transition',
        'Agent re-captures and verifies the dashboard screen loaded (checks for welcome message, nav tabs)',
        'Agent swipes down to verify the content list loads and scrolls correctly',
      ],
    },
    cardDescription: 'Control the iOS Simulator without Appium or XCUITest. Tap, swipe, type, and verify — all through the macOS screen. Zero test framework setup.',
    cardCmd: 'agent-vision drag --from 215,700 --to 215,300 --session $SID',
  },
  {
    slug: 'desktop-workflows',
    title: 'Chain Desktop Apps into AI Workflows',
    headline: 'Chain desktop apps into AI workflows',
    metaDescription: 'Use Agent Vision as the Zapier for your actual desktop. Chain Mail.app, Calendar, Slack, and spreadsheets into AI-powered workflows. No app needs to support integrations.',
    intro: 'Think of it as Zapier for your actual desktop, but with AI intelligence. Agent Vision sees and controls every app on your Mac — Mail, Calendar, Slack, Numbers, Preview, anything. Chain them into workflows: read email, create calendar event, post summary to Slack, log it in a spreadsheet. No app needs to support integrations because Agent Vision works at the screen level. Every window is just another interface to scan and interact with.',
    beforeTitle: 'Without Agent Vision',
    beforeText: 'Desktop app automation on macOS means AppleScript, which is unreliable and limited. Most apps have partial or no AppleScript support. Shortcuts.app helps for simple tasks but can\'t handle complex multi-app workflows with decision logic. You end up doing multi-step desktop workflows manually: read the email, copy the date, switch to Calendar, create an event, switch to Slack, type a message. Dozens of app switches per workflow.',
    afterTitle: 'With Agent Vision',
    afterText: 'Your AI agent manages sessions for each app window. It reads content from Mail.app, extracts dates and details, switches to Calendar to create an event, composes a Slack message with the summary, and logs everything in a Numbers spreadsheet. Each app is just a window to capture, scan for elements, and interact with. The AI agent handles the logic, context, and decision-making.',
    commands: [
      {
        label: 'Start sessions for each app',
        cmd: 'agent-vision start --region 0,0,800,600 --name mail',
        description: 'Create a named session for Mail.app. Repeat for Calendar, Slack, Numbers.',
      },
      {
        label: 'Read email content',
        cmd: 'agent-vision capture --session $MAIL_SID',
        description: 'Screenshot the email. Your AI agent reads the content from the image.',
      },
      {
        label: 'Create a calendar event',
        cmd: 'agent-vision click --element el-btn-new-event --session $CAL_SID',
        description: 'Switch to Calendar and click "New Event" to start creating an entry.',
      },
      {
        label: 'Fill in event details',
        cmd: 'agent-vision type --element el-input-title --text "Team standup re: Q2 planning" --session $CAL_SID',
        description: 'Type the event title extracted from the email.',
      },
      {
        label: 'Post to Slack',
        cmd: 'agent-vision type --element el-input-message --text "New meeting scheduled: Q2 planning" --session $SLACK_SID',
        description: 'Switch to Slack and type a summary message in the channel input.',
      },
      {
        label: 'Log in spreadsheet',
        cmd: 'agent-vision type --element el-cell-A1 --text "2026-03-31" --session $NUMBERS_SID',
        description: 'Switch to Numbers and log the event date in the tracking spreadsheet.',
      },
    ],
    scenario: {
      title: 'Example: Email → Calendar → Slack → Spreadsheet',
      steps: [
        'Agent captures Mail.app and reads the latest email about a meeting request',
        'Agent extracts the date, time, attendees, and subject from the email content',
        'Agent switches to Calendar, clicks "New Event", and fills in all the details',
        'Agent saves the calendar event and verifies it appears on the correct date',
        'Agent switches to Slack, navigates to the team channel, and posts a summary message',
        'Agent switches to Numbers and adds a row logging the meeting with date, subject, and attendees',
      ],
    },
    cardDescription: 'Zapier for your actual desktop. Read email in Mail.app, create Calendar events, post to Slack, log in spreadsheets. No app needs integrations.',
    cardCmd: 'agent-vision start --region 0,0,800,600 --name mail',
  },
];
