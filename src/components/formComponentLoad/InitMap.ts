export const InitMap: { [key: string]: () => Promise<any> } = {
  MyComponent2: () => import('pages/etv/FormPrueba2.vue'),
  'F-AM-1': () => import('pages/etv/F-AM-1/init.ts'),
  'F-AM-2': () => import('pages/etv/F-AM-2/init.ts')
}