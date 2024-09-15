export const searchUsers = async (searchTerm) => {
    try {
        const url = `${process.env.REACT_APP_SERVER_URL}/api/users/?search=${encodeURIComponent(searchTerm)}`; // 使用查询字符串传递搜索词
        const response = await fetch(url, {
            method: 'GET', // 使用GET 方法获取查询用户结果
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const result = await response.json();
        return ('Fetch successful', result);
    } catch (error) {
        return ('Error fetching users:', error);
    }
};