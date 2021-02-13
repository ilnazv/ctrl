import { useEffect, useState } from "react";
import { subscribeToList } from "./services/firestoreService";

export function Game(): JSX.Element {
    const [list, setList] = useState<{ id: string, name: string }[]>([]);

    useEffect(() => {
        const subscription = subscribeToList(data => {
            setList(data);
        });
        return subscription;
    }, []);

    return <>
        {list.map(x => (<span key={`${x.id}`}>{x.id} - {x.name}</span>))}
    </>;
}