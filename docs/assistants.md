Assistants API overview

Beta

===============================

Build AI Assistants with essential tools and integrations.

The Assistants API allows you to build AI assistants within your own applications. An Assistant has instructions and can leverage models, tools, and files to respond to user queries. The Assistants API currently supports three types of [tools](/docs/assistants/tools): Code Interpreter, File Search, and Function calling.

You can explore the capabilities of the Assistants API using the [Assistants playground](/playground?mode=assistant) or by building a step-by-step integration outlined in our [Assistants API quickstart](/docs/assistants/quickstart).

How Assistants work
-------------------

The Assistants API is designed to help developers build powerful AI assistants capable of performing a variety of tasks.

The Assistants API is in **beta** and we are actively working on adding more functionality. Share your feedback in our [Developer Forum](https://community.openai.com/)!

1.  Assistants can call OpenAI’s **[models](/docs/models)** with specific instructions to tune their personality and capabilities.
2.  Assistants can access **multiple tools in parallel**. These can be both OpenAI-hosted tools — like [code\_interpreter](/docs/assistants/tools/code-interpreter) and [file\_search](/docs/assistants/tools/file-search) — or tools you build / host (via [function calling](/docs/assistants/tools/function-calling)).
3.  Assistants can access **persistent Threads**. Threads simplify AI application development by storing message history and truncating it when the conversation gets too long for the model’s context length. You create a Thread once, and simply append Messages to it as your users reply.
4.  Assistants can access files in several formats — either as part of their creation or as part of Threads between Assistants and users. When using tools, Assistants can also create files (e.g., images, spreadsheets, etc) and cite files they reference in the Messages they create.

Objects
-------

![Assistants object architecture diagram](https://cdn.openai.com/API/docs/images/diagram-assistant.webp)

|Object|What it represents|
|---|---|
|Assistant|Purpose-built AI that uses OpenAI’s models and calls tools|
|Thread|A conversation session between an Assistant and a user. Threads store Messages and automatically handle truncation to fit content into a model’s context.|
|Message|A message created by an Assistant or a user. Messages can include text, images, and other files. Messages stored as a list on the Thread.|
|Run|An invocation of an Assistant on a Thread. The Assistant uses its configuration and the Thread’s Messages to perform tasks by calling models and tools. As part of a Run, the Assistant appends Messages to the Thread.|
|Run Step|A detailed list of steps the Assistant took as part of a Run. An Assistant can call tools or create Messages during its run. Examining Run Steps allows you to introspect how the Assistant is getting to its final results.|

Was this page useful?

Assistants API quickstart

Beta

=================================

Step-by-step guide to creating an assistant.

A typical integration of the Assistants API has the following flow:

1.  Create an [Assistant](/docs/api-reference/assistants/createAssistant) by defining its custom instructions and picking a model. If helpful, add files and enable tools like Code Interpreter, File Search, and Function calling.
2.  Create a [Thread](/docs/api-reference/threads) when a user starts a conversation.
3.  Add [Messages](/docs/api-reference/messages) to the Thread as the user asks questions.
4.  [Run](/docs/api-reference/runs) the Assistant on the Thread to generate a response by calling the model and the tools.

This starter guide walks through the key steps to create and run an Assistant that uses [Code Interpreter](/docs/assistants/tools/code-interpreter). In this example, we're [creating an Assistant](/docs/api-reference/assistants/createAssistant) that is a personal math tutor, with the Code Interpreter tool enabled.

Calls to the Assistants API require that you pass a beta HTTP header. This is handled automatically if you’re using OpenAI’s official Python or Node.js SDKs. `OpenAI-Beta: assistants=v2`

Step 1: Create an Assistant
---------------------------

An [Assistant](/docs/api-reference/assistants/object) represents an entity that can be configured to respond to a user's messages using several parameters like `model`, `instructions`, and `tools`.

Create an Assistant

```python
from openai import OpenAI
client = OpenAI()

assistant = client.beta.assistants.create(
name="Math Tutor",
instructions="You are a personal math tutor. Write and run code to answer math questions.",
tools=[{"type": "code_interpreter"}],
model="gpt-4o",
)
```

```javascript
import OpenAI from "openai";
const openai = new OpenAI();

async function main() {
const assistant = await openai.beta.assistants.create({
  name: "Math Tutor",
  instructions: "You are a personal math tutor. Write and run code to answer math questions.",
  tools: [{ type: "code_interpreter" }],
  model: "gpt-4o"
});
}

main();
```

```bash
curl "https://api.openai.com/v1/assistants" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $OPENAI_API_KEY" \
-H "OpenAI-Beta: assistants=v2" \
-d '{
  "instructions": "You are a personal math tutor. Write and run code to answer math questions.",
  "name": "Math Tutor",
  "tools": [{"type": "code_interpreter"}],
  "model": "gpt-4o"
}'
```

Step 2: Create a Thread
-----------------------

A [Thread](/docs/api-reference/threads/object) represents a conversation between a user and one or many Assistants. You can create a Thread when a user (or your AI application) starts a conversation with your Assistant.

Create a Thread

```python
thread = client.beta.threads.create()
```

```javascript
const thread = await openai.beta.threads.create();
```

```bash
curl https://api.openai.com/v1/threads \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $OPENAI_API_KEY" \
-H "OpenAI-Beta: assistants=v2" \
-d ''
```

Step 3: Add a Message to the Thread
-----------------------------------

The contents of the messages your users or applications create are added as [Message](/docs/api-reference/messages/object) objects to the Thread. Messages can contain both text and files. There is a limit of 100,000 Messages per Thread and we smartly truncate any context that does not fit into the model's context window.

Add a Message to the Thread

```python
message = client.beta.threads.messages.create(
thread_id=thread.id,
role="user",
content="I need to solve the equation `3x + 11 = 14`. Can you help me?"
)
```

```javascript
const message = await openai.beta.threads.messages.create(
thread.id,
{
  role: "user",
  content: "I need to solve the equation `3x + 11 = 14`. Can you help me?"
}
);
```

```bash
curl https://api.openai.com/v1/threads/thread_abc123/messages \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $OPENAI_API_KEY" \
-H "OpenAI-Beta: assistants=v2" \
-d '{
    "role": "user",
    "content": "I need to solve the equation `3x + 11 = 14`. Can you help me?"
  }'
```

Step 4: Create a Run
--------------------

Once all the user Messages have been added to the Thread, you can [Run](/docs/api-reference/runs/object) the Thread with any Assistant. Creating a Run uses the model and tools associated with the Assistant to generate a response. These responses are added to the Thread as `assistant` Messages.

With streamingWithout streaming

You can use the 'create and stream' helpers in the Python and Node SDKs to create a run and stream the response.

Create and Stream a Run

```python
from typing_extensions import override
from openai import AssistantEventHandler

# First, we create a EventHandler class to define
# how we want to handle the events in the response stream.

class EventHandler(AssistantEventHandler):    
@override
def on_text_created(self, text) -> None:
  print(f"\nassistant > ", end="", flush=True)
    
@override
def on_text_delta(self, delta, snapshot):
  print(delta.value, end="", flush=True)
    
def on_tool_call_created(self, tool_call):
  print(f"\nassistant > {tool_call.type}\n", flush=True)

def on_tool_call_delta(self, delta, snapshot):
  if delta.type == 'code_interpreter':
    if delta.code_interpreter.input:
      print(delta.code_interpreter.input, end="", flush=True)
    if delta.code_interpreter.outputs:
      print(f"\n\noutput >", flush=True)
      for output in delta.code_interpreter.outputs:
        if output.type == "logs":
          print(f"\n{output.logs}", flush=True)

# Then, we use the `stream` SDK helper 
# with the `EventHandler` class to create the Run 
# and stream the response.

with client.beta.threads.runs.stream(
thread_id=thread.id,
assistant_id=assistant.id,
instructions="Please address the user as Jane Doe. The user has a premium account.",
event_handler=EventHandler(),
) as stream:
stream.until_done()
```

```javascript
// We use the stream SDK helper to create a run with
// streaming. The SDK provides helpful event listeners to handle 
// the streamed response.

const run = openai.beta.threads.runs.stream(thread.id, {
  assistant_id: assistant.id
})
  .on('textCreated', (text) => process.stdout.write('\nassistant > '))
  .on('textDelta', (textDelta, snapshot) => process.stdout.write(textDelta.value))
  .on('toolCallCreated', (toolCall) => process.stdout.write(`\nassistant > ${toolCall.type}\n\n`))
  .on('toolCallDelta', (toolCallDelta, snapshot) => {
    if (toolCallDelta.type === 'code_interpreter') {
      if (toolCallDelta.code_interpreter.input) {
        process.stdout.write(toolCallDelta.code_interpreter.input);
      }
      if (toolCallDelta.code_interpreter.outputs) {
        process.stdout.write("\noutput >\n");
        toolCallDelta.code_interpreter.outputs.forEach(output => {
          if (output.type === "logs") {
            process.stdout.write(`\n${output.logs}\n`);
          }
        });
      }
    }
  });
```

See the full list of Assistants streaming events in our API reference [here](/docs/api-reference/assistants-streaming/events). You can also see a list of SDK event listeners for these events in the [Python](https://github.com/openai/openai-python/blob/main/helpers.md#assistant-events) & [Node](https://github.com/openai/openai-node/blob/master/helpers.md#assistant-events) repository documentation.

Next steps
----------

1.  Continue learning about Assistants Concepts in the [Deep Dive](/docs/assistants/deep-dive)
2.  Learn more about [Tools](/docs/assistants/tools)
3.  Explore the [Assistants playground](/playground?mode=assistant)
4.  Check out our [Assistants Quickstart app](https://github.com/openai/openai-assistants-quickstart) on github

Was this page useful?