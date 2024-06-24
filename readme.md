original repo: https://github.com/google-gemini/generative-ai-js

package.json
```json
"dependencies": {
  "@google/generative-ai": "https://github.com/wujohns/google-generative-ai.git",
  "undici": "^6.19.2"
}
```

usage:
```js
const { ProxyAgent } = require('undici')
const dispatcher = new ProxyAgent('http://127.0.0.1:7890')

const { GoogleGenerativeAI } = require('@google/generative-ai')
const genAI = new GoogleGenerativeAI('you_api_key')
const model = genAI.getGenerativeModel(
  { model: 'gemini-1.5-flash-001' },
  { dispatcher }
)

const run = async () => {
  const result = await model.generateContent('hello')
  console.log(result.response.text())
}
run().then(() => process.exit(0))
```
