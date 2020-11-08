import { Either, Left, Right } from "monet";

export const Storage = <DataType>(key: string) => {
    return {
        set: (value: DataType) => {
            localStorage.setItem(
                key,
                JSON.stringify({
                    value,
                    time: Date.now(),
                })
            );
        },
        get: (): Either<Error, DataType> => {
            try {
                const nat = localStorage.getItem(key);
                if (!nat) return Left(new Error());
                const data = JSON.parse(nat).value;
                if (!data) return Left(new Error());
                return Right(data);
            } catch (e) {
                return Left(new Error());
            }
        },
    };
};
