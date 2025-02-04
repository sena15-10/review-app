import { Code2, Users2, Rocket, GanttChart } from "lucide-react";
import React ,{ useEffect } from "react";


const BenefitSection = () => {
    const benefits = [
        {
            icon: <Code2 size={24} />,
            title: "コード品質の向上",
            description: "経験豊富なエンジニアからのフィードバックで、コードの品質が向上します。"
        },
        {
            icon: <Users2 size={24} />,
            title: "コミュニティの支援",
            description: "プログラミングの課題を共有し、仲間と一緒に成長できます。"
        },
        {
            icon: <GanttChart size={24} />,
            title: "効率的な学習",
            description: "実践的なフィードバックで、効率的にスキルアップできます。"
        },
        {
            icon: <Rocket size={24} />,
            title: "キャリアの成長",
            description: "質の高いコードを書く力が身につき、キャリアの成長につながります。"
        }
    ];

    return (
        <div className='benefit detailText'>
            <section className="benefitContent">
                <h2>4. Rviewを使うメリット</h2>
                <p className="benefit-intro">
                    個人開発やチーム開発、学習中のコードなど、
                    あらゆる場面でRviewを活用して、プログラミングスキルを向上させましょう。
                </p>
                <div className="benefit-grid">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="benefit-card">
                            <div className="benefit-icon">
                                {benefit.icon}
                            </div>
                            <h3>{benefit.title}</h3>
                            <p>{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            <div className="start">
                <button className="start-button">
                    今すぐ始める
                </button>
            </div>
        </div>
    );
};

export default BenefitSection