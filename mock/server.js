const Koa = require('koa');
const koaRouter = require('koa-router');
const app = new Koa();
const router = koaRouter();
/**-------------------------------------------------------------------------------------
 * 账户管理mock数据 /account/
 * 1.账户详细   /account/QueryAccountDetail
 */

//账户详细
var QueryAccountDetail = require('./AccountMock/QueryAccountDetail.js')
router.post('/mock/QueryAccountDetail', function (data, next) {
    console.log(QueryAccountDetail)
    data.body = QueryAccountDetail
});

// 开始服务并生成路由
app.use(router.routes())
    .use(router.allowedMethods())
app.listen(3000);