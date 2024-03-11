//layout
// import Layout from "../layouts/default";

//import Link
import Link from 'next/link';

//import Head
import Head from 'next/head';

export default function Home() {
    return (
        // <button className="btn btn-primary">Hello daisyUI!</button>
        <Link href="/protected" className="btn btn-primary">Dashboard</Link>
    )
}