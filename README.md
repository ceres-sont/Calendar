### Ứng Dụng Lịch (Calendar App)

## Giới thiệu

Ứng dụng Lịch là một ứng dụng web hiện đại được xây dựng bằng Next.js, cho phép người dùng xem lịch theo tháng hoặc tuần và tạo ghi chú cho các ngày cụ thể. Ứng dụng này sử dụng các công nghệ mới nhất của Next.js và React để cung cấp trải nghiệm người dùng mượt mà và phản hồi nhanh.

## Tính năng

- **Xem lịch theo tháng**: Hiển thị lịch truyền thống với tất cả các ngày trong tháng
- **Xem lịch theo tuần**: Hiển thị lịch theo tuần với các giờ trong ngày
- **Quản lý ghi chú**:

- Tạo ghi chú cho bất kỳ ngày nào
- Chỉnh sửa ghi chú hiện có
- Xóa ghi chú không cần thiết
- Xem tất cả ghi chú cho một ngày cụ thể



- **Điều hướng**:

- Chuyển đổi giữa các tháng/tuần
- Nhanh chóng quay lại ngày hiện tại
- Chuyển đổi giữa chế độ xem tháng và tuần



- **Quản lý dữ liệu**:

- Lưu trữ dữ liệu cục bộ trong trình duyệt
- Xuất dữ liệu ghi chú để sao lưu
- Nhập dữ liệu ghi chú từ tệp sao lưu
- Di chuyển dữ liệu giữa các phiên bản ứng dụng





## Cài đặt

### Yêu cầu hệ thống

- Node.js (phiên bản 14.x trở lên)
- Yarn hoặc npm


### Các bước cài đặt

1. Clone repository:


```shellscript
git clone https://github.com/your-username/calendar-app.git
cd calendar-app
```

2. Cài đặt các dependencies:


```shellscript
yarn install
```

3. Cài đặt các thành phần UI:


```shellscript
npx shadcn@latest init
```

Khi được hỏi, hãy chọn các tùy chọn sau:

- TypeScript: Yes
- Style: Default (hoặc tùy chọn màu sắc bạn thích)
- Global CSS: Yes
- CSS variables: Yes
- React Server Components: Yes
- Tailwind CSS: Yes
- Các tùy chọn khác có thể để mặc định


4. Cài đặt các thành phần UI cần thiết:


```shellscript
npx shadcn@latest add button
npx shadcn@latest add tabs
npx shadcn@latest add dialog
npx shadcn@latest add popover
npx shadcn@latest add calendar
npx shadcn@latest add textarea
npx shadcn@latest add alert
```

5. Khởi chạy ứng dụng ở chế độ phát triển:


```shellscript
yarn dev
```

Ứng dụng sẽ chạy tại địa chỉ [http://localhost:3000](http://localhost:3000).

## Hướng dẫn sử dụng

### Xem lịch

- **Chuyển đổi chế độ xem**: Sử dụng các tab "Month" và "Week" để chuyển đổi giữa chế độ xem tháng và tuần.
- **Điều hướng**: Sử dụng các nút mũi tên để di chuyển giữa các tháng hoặc tuần.
- **Quay lại ngày hiện tại**: Nhấp vào nút "Today" để quay lại ngày hiện tại.


### Quản lý ghi chú

- **Thêm ghi chú**: Nhấp vào một ngày trong lịch để mở hộp thoại ghi chú, nhập nội dung và nhấp "Save Note".
- **Chỉnh sửa ghi chú**: Trong hộp thoại ghi chú, nhấp vào nút "Edit" bên cạnh ghi chú hiện có, chỉnh sửa nội dung và nhấp "Update Note".
- **Xóa ghi chú**: Trong hộp thoại ghi chú, nhấp vào nút "Delete" bên cạnh ghi chú hiện có.


### Quản lý dữ liệu

- **Xuất dữ liệu**: Nhấp vào nút "Export" để tải xuống tệp JSON chứa tất cả ghi chú của bạn.
- **Nhập dữ liệu**: Nhấp vào nút "Import", chọn tệp JSON đã xuất trước đó và nhấp "Import" để khôi phục dữ liệu.


## Quản lý dữ liệu giữa các phiên bản

Ứng dụng này được thiết kế để duy trì dữ liệu của bạn khi nâng cấp giữa các phiên bản. Dữ liệu được lưu trữ trong localStorage của trình duyệt và được tự động di chuyển khi phát hiện phiên bản mới.

Tuy nhiên, để đảm bảo an toàn, bạn nên:

1. Xuất dữ liệu của bạn trước khi cập nhật lên phiên bản mới
2. Nếu dữ liệu không xuất hiện sau khi cập nhật, hãy sử dụng tính năng nhập để khôi phục dữ liệu từ tệp sao lưu


## Công nghệ sử dụng

- **Next.js**: Framework React với App Router
- **React**: Thư viện UI
- **TypeScript**: Ngôn ngữ lập trình
- **Tailwind CSS**: Framework CSS
- **shadcn/ui**: Thành phần UI
- **date-fns**: Thư viện xử lý ngày tháng
- **localStorage**: Lưu trữ dữ liệu cục bộ


## Cấu trúc dự án

```plaintext
calendar-app/
├── app/                  # Thư mục App Router của Next.js
│   ├── layout.tsx        # Layout chính
│   ├── page.tsx          # Trang chính
│   └── globals.css       # CSS toàn cục
├── components/           # Các thành phần React
│   ├── calendar.tsx      # Thành phần lịch chính
│   ├── month-view.tsx    # Chế độ xem tháng
│   ├── week-view.tsx     # Chế độ xem tuần
│   ├── note-dialog.tsx   # Hộp thoại ghi chú
│   ├── data-management.tsx # Quản lý dữ liệu (xuất/nhập)
│   └── ui/               # Các thành phần UI từ shadcn
├── hooks/                # Custom React hooks
│   └── use-notes.tsx     # Hook quản lý ghi chú
├── lib/                  # Thư viện và tiện ích
│   └── utils.ts          # Các hàm tiện ích
├── types/                # Định nghĩa TypeScript
│   └── index.ts          # Các kiểu dữ liệu
└── public/               # Tài nguyên tĩnh
```

## Cải tiến trong tương lai

- Thêm xác thực người dùng
- Đồng bộ hóa dữ liệu qua đám mây
- Thêm chế độ xem năm
- Thêm nhắc nhở và thông báo
- Tích hợp với các dịch vụ lịch khác (Google Calendar, Outlook, v.v.)
- Thêm chế độ tối (Dark mode)
- Hỗ trợ nhiều ngôn ngữ


## Đóng góp

Mọi đóng góp đều được hoan nghênh! Nếu bạn muốn đóng góp, vui lòng:

1. Fork repository
2. Tạo nhánh tính năng (`git checkout -b feature/amazing-feature`)
3. Commit các thay đổi của bạn (`git commit -m 'Add some amazing feature'`)
4. Push lên nhánh (`git push origin feature/amazing-feature`)
5. Mở Pull Request

Tác giả: **Trịnh Vũ Xuân Sơn**
