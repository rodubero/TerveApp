import { send, time } from '../deps.js';

const errorMiddleware = async(context, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
  }
}

const requestTimingMiddleware = async({ request, session}, next) => {
  const start = time().now();
  //const start = Date.now();
  await next();
  //const ms = Date.now() - start;
  const user = await session.get('user');
  let name = '';
  if (typeof user === 'undefined' || user === null){
    name = 'anonymous';
  } else {
    name = user.email;
  }
  console.log(`${start} ${request.method} ${request.url.pathname} by ${name}`);
}

const serveStaticFilesMiddleware = async(context, next) => {
  if (context.request.url.pathname.startsWith('/static')) {
    const path = context.request.url.pathname.substring(7);
  
    await send(context, path, {
      root: `${Deno.cwd()}/static`
    });
  
  } else {
    await next();
  }
}

const authMiddleware = async({request, response, session}, next) => {
  if ((await session.get('authenticated'))){
    if (request.url.pathname.startsWith('/auth', '/api') || request.url.pathname === '/') {
      if (request.url.pathname === '/auth/logout'){
        await next();
      } else {
        response.redirect('/home');
      }
              
    } else {
      await next();
    }
  } else {
    if (request.url.pathname.startsWith('/auth', '/api') || request.url.pathname === '/') {
      await next();       
    } else {
      response.redirect('/auth/login');
    }
  }
};

export { errorMiddleware, requestTimingMiddleware, serveStaticFilesMiddleware, authMiddleware };