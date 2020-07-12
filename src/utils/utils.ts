export interface ActionShape {
  type: string;
  payload?: {};
}

export const createAction = <A extends ActionShape>(type: A['type']) => (
  payload: A['payload']
) => ({
  type,
  payload,
});
