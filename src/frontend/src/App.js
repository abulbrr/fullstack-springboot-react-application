import {useEffect, useState} from "react";
import {getAllStudents} from "./client";
import {Empty, Layout, Menu, Spin, Table} from "antd";

import {
    LoadingOutlined,
    PieChartOutlined,
} from '@ant-design/icons';

import './App.css';

const {Header, Content, Footer, Sider} = Layout;

const loadingIcon = <LoadingOutlined style={{ fontSize: 24}}/>

function App() {
    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
    ];

    useEffect(() => {
        console.log("Component is mounted")
        fetchStudents()
    }, [])

    const fetchStudents = () => {
        getAllStudents()
            .then(res => res.json())
            .then(data => {
                setStudents(data)
                console.log(data)
                setFetching(false)
            })
    }

    const renderStudentsTable = () => {
        if (fetching) {
            return <Spin indicator={loadingIcon}></Spin>
        }
        if(students.length === 0) {
            return <Empty/>
        }
        return <Table dataSource={students}
               columns={columns}
               rowKey="id"
               bordered
               title={() => "Students"}
               pagination={{ pageSize: 50}}
               scroll={{ y: 240}}
        />

    }

    return <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed}
               onCollapse={setCollapsed}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                    Pie Chart Outlined
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    {renderStudentsTable()}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Habbal © 2022</Footer>
        </Layout>
    </Layout>
}

export default App;
