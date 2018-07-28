const {getNewTagName} = require('./urlOptions')
const {add, commit, tag, deleteLocalTag, pushTags}=require('./gitCommands')
module.exports.updateVersion=()=>getNewTagName().then(({newTag})=>{
    return add('.')
    .then(()=>commit(`release ${newTag}`))
    .then(()=>deleteLocalTag(newTag))
    .catch(_=>{
        console.log("Tag does not exist, creating...")
    })
    .then(()=>deleteRemoteTag(newTag))
    .catch(_=>{
        console.log("No remote tag")
    })
    .then(()=>tag(newTag))
    .then(pushTags)
})


