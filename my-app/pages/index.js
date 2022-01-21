import Seo from "../components/Seo.js"
import Link from "next/link"
import {useState, useEffect} from "react";
import {useRouter} from "next/router";

export default function Home({results}){
    const router = useRouter();
    const onClick = (id,title) => {
        router.push(`/movies/${title}/${id}`);
    }
    return (
        <div className="container">
            <Seo title="Home"/>
            {results?.map(movie=>
                    <div onClick={()=>onClick(movie.id, movie.original_title)} className="movie" key={movie.id}>
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                        <h4>
                            <Link href = {`/movies/${movie.original_title}/${movie.id}`}>
                                <a>{movie.original_title}</a>
                            </Link>
                        </h4>
                    </div>
            )}
            <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
        </div>
    );
}
//export를 해주고 props 객체와 result 객체를 반환한다.
//그렇게 하면 ssr 가능. -> 사용자가 로딩 화면을 보지 않고 모든 html이 완성된 체로 나타나서 seo 문제를 해결할 수 있다.
//단점은
export async function getServerSideProps(){
    const {results} = await (await fetch(`http://localhost:3000/api/movies`)).json()
    return {
        props: {
            results,
        },
    }
}