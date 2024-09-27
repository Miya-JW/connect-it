import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY_GOOGLE_BOOKS; // Google Books API密钥

const fetchBooksByQuery = async (query, type) => {
    let url = `https://www.googleapis.com/books/v1/volumes?q=`;
    switch (type) {
        case 'book_title':
            url += `intitle:${encodeURIComponent(query)}`;
            break;
        case 'book_author':
            url += `inauthor:${encodeURIComponent(query)}`;
            break;
        case 'book_newest':
            if (!query) {
                // 如果没有具体的查询关键字，我们仍然可以请求最新的书籍
                // query = 'fiction'
                const category = 'psychology';
                url += `subject:${encodeURIComponent(category)}&key=${apiKey}`;
            } else {
                // 如果有查询关键字，按关键字和新书排序
                url += `${encodeURIComponent(query)}&orderBy=newest`;
            }
            break;
        case 'book_popular':
            if (!query) {
                // 如果没有具体的查询关键字，我们仍然可以请求最新的书籍
                // query = 'information technology'
                const keywords = 'information technology';
                const category = 'computers';
                url += `${encodeURIComponent(keywords)}+subject:${encodeURIComponent(category)}`;
            } else {
                // 如果有查询关键字，按关键字和新书排序
                url += `${encodeURIComponent(query)}&orderBy=relevance`;
            }
            break;

        default:
            break;
    }

    url += `&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        let books = response.data.items ? response.data.items.map(book => formatBookData(book)) : [];
        // 在客户端按 ratingsCount 降序排序
        books.sort((a, b) => b.ratingsCount - a.ratingsCount);
        return books;
    } catch (error) {
        console.error('Error fetching books:', error);
        return [];
    }
};

const formatBookData = (book) => {
    const volumeInfo = book.volumeInfo;
    return {
        book_id: book.id,
        book_title: volumeInfo.title,
        book_ISBN: volumeInfo.industryIdentifiers ? volumeInfo.industryIdentifiers.find(id => id.type === 'ISBN_13' || id.type === 'ISBN_10')?.identifier : 'N/A',
        book_publisher: volumeInfo.publisher || 'N/A',
        book_author: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'N/A',
        book_publish_date: volumeInfo.publishedDate || 'N/A',
        book_genre: volumeInfo.categories ? volumeInfo.categories.join(', ') : 'N/A',
        book_summary: volumeInfo.description || 'N/A',
        book_language: volumeInfo.language || 'N/A',
        book_number_of_page: volumeInfo.pageCount || 0,
        book_image: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x194'
    };
};

export { fetchBooksByQuery };