// src/access.ts
export default function access(initialState) {
  return {
    roleAuth: (route) => {
      return true
      // const { roleInfo } = initialState;
      // if (!roleInfo) {
      //   return false;
      // }
      // const menuPerm = roleInfo.menuPerm?.split(',') || [];
      // return menuPerm.includes(route.path);
    },
  };
}
