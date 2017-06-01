(function(){
  let messageObj = {
    env: null,
    title: document.querySelector('.js-issue-title').innerHTML.trim(),
    target: 'フロント（web）',
    url: location.href
  }

  let actualBranch = document.querySelector('.commit-ref span').innerHTML
  if (actualBranch === 'master') {
    messageObj.env = '商用'
  } else if (actualBranch.includes('test/stg')) {
    messageObj.env = 'stg'
  } else if (actualBranch.includes('test/dev')) {
    messageObj.env = 'dev'
  } else {
    messageObj.env = '???'
  }

  let text = 'フロント（web, conv）, Turmeric, パッチ'
  let dialog = window.prompt('対象はどこですか？', text)

  if (dialog != '') {
    messageObj.target = dialog
  } else {
    messageObj.target = text
  }

  let copyMessage = `#デプロイ

これよりデプロイします。

----
環境: ${messageObj.env}
対象： ${messageObj.target}
ブランチ： ${actualBranch}
内容： ${messageObj.title}
----
${messageObj.url}

よろしくお願いいたします。
`
  let copyElem = document.createElement('textarea')
  let bodyElem = document.querySelector('body')
  copyElem.textContent = copyMessage
  bodyElem.appendChild(copyElem)
  copyElem.select()
  let value = document.execCommand('copy')
  bodyElem.removeChild(copyElem)
})()
