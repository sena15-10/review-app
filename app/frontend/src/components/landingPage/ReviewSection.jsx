import React,{ useEffect } from 'react';
import {Users} from "lucide-react";
import CodeBlock from './CodeBlock';
const SampleCode = 
    `function greeting(){
        return "Hello World";
    } 
    greeting();
    `

const RviewSection = () => {
    return (    
    <div className='review detailText'>
        <section>
            <h2>1. 経験豊富なエンジニアからフィードバック<Users size={35}></Users></h2>
            <p>
                コードの改善点やベストプラクティスについて、さまざまなエンジニアから具体的なアドバイスを受けることができます。  
                投稿されたコードは、不特定多数のユーザーが自由にレビューし、意見や提案を共有することができます。  
                初心者から経験豊富なエンジニアまで、多様な視点からのフィードバックを受けることで、  
                より良いコードの書き方や新しいアイデアを得ることができます。  
                また、レビューを通じて他の人の考え方を学び、スキルアップにもつながります。  
                コミュニティの力を活用し、実践的な知識を身につけましょう。  
                学生や初心者の方も気軽に投稿でき、分かりやすく丁寧なフィードバックを得られる環境を提供しています。  
            </p>
        </section>
        <div className='codeBlock'>
            <div className='codeHeader'>
                <span>Javascript</span>
            </div>
            <div className='codeField'>
                <CodeBlock code = {SampleCode}/>
            </div>
        </div>

    </div>
    )
}
export default RviewSection