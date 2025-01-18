import { Context } from "hono";
import { env } from "hono/adapter";

const cloudFlareClients = {
    
  async get(key: string, c: Context) {
    const { KV_MY } = env<{ KV_MY: KVNamespace }>(c); 
    const get = await KV_MY.get(key)
    return get
  },
  async put(key:string, value: string | ArrayBuffer | ArrayBufferView,c: Context) {
    const { KV_MY } = env<{ KV_MY: KVNamespace }>(c); 
    const put = await KV_MY.put(key,value)
    return put
  },
  async delete(key:string,c: Context) {
    const { KV_MY } = env<{ KV_MY: KVNamespace }>(c); 
    const put = await KV_MY.delete(key)
    return put
  },

};

export default cloudFlareClients;
