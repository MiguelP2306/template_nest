// eslint-disable-next-line @typescript-eslint/ban-types
export type DecoratorRoleType = <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
