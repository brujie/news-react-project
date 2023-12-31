import { Button,notification } from 'antd'
import React, { useState, useEffect } from 'react'
import NewsPublish from '../../components/NewsPublish'
import { SAVEUSER } from '../../util/constant'

export default function PublishUnpublished() {
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        React.$http.get(`/news?author=${SAVEUSER().username}&publishState=1&_expand=category`).then((res) => {
            //console.log(res.data);
            setDataSource(res);
        })
    }, [])
    const upNews = (id) => {
        //console.log(id);
        React.$http.patch(`/news/${id}`, {
            publishState: 2
        }).then(() => {
            setDataSource(dataSource.filter(data => data.id !== id))
            notification.info({
                message: "通知",
                description: "您的新闻已发布!",
                placement: "bottomRight",
            });
        })
    }
    return (
        <div>
            <NewsPublish dataSource={dataSource} button={(id) => <Button type="primary" onClick={() => upNews(id)}>发布</Button>} />
        </div>
    )
}
