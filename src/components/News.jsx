import React, {useState} from 'react';
import {Select, Typography, Row, Col, Avatar, Card} from "antd";
import moment from "moment";

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const {Text,Title} = Typography;
const {Option} = Select;

const News = ({simplified}) => {
    const [newsCategory, setNewsCategory] = useState("Cryptocurrency crypto")
    const {data} = useGetCryptosQuery();
    const {data: cryptoNews} = useGetCryptoNewsQuery(newsCategory);
    const count = simplified? 6:12;
    const demoImage = "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg"
    console.log(cryptoNews)

    if(!cryptoNews?.value) return "Loading..." 
    return (
        <>
            <Row gutter={[24, 24]}>
                {!simplified && (
                    <Col span={24}>
                        <Select
                        showSearch
                        className="select-news"
                        placeholder="Select a Crypto"
                        optionFilterProp="children"
                        onChange={(value)=> setNewsCategory(value)}
                        filterOption={(input,option) => option.children.toLowerCase().indexOf(input.toLowerCase())}>
                            <Option value="Cryptocurrency crypto" >Cryptocurrency</Option>
                            {data?.data?.coins.map((coin)=> <Option value={coin.name}>{coin.name}</Option>)}
                        </Select>
                    </Col>
                )}
                {cryptoNews.value.slice(0,count).map((news,i) =>(
                    <Col xs={24} sm={12} lg={8} key={i}>
                        <Card className="news-card" hoverable>
                            <a href={news.url} target="_blank" rel="noreferrer" >
                                <div className="news-image-container">
                                    <Title className="news-title" level={4}>{news.name}</Title>
                                    <img style={{maxWidth: "200px", maxHeight:"200px"}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="cryptoNews" /> 
                                </div>
                                <p>{news.description > 100 ? `${news.description.substring(0,100)}...` : news.description}</p>
                                <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                                    <Text> {moment(news.datePublished).startOf("ss").fromNow()}</Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default News
