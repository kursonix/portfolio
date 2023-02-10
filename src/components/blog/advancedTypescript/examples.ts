type Exclude<T, U> = T extends U ? never : T;
type test = Exclude<'a' | 'b' | 'c', 'a' | 'b'>


type SomeType<T> = T extends string ? string : any;
type StringType = SomeType<"test">;
type AnyType = SomeType<1>;

type InferSth<T> = T extends {a: infer A} ? A : any;
type Inferred = InferSth<{a: "test"}>; 

type Typess = ReturnType<() => true>
type Exclude2 = Exclude<1|2|'a'|null|'b', 1>

export {}