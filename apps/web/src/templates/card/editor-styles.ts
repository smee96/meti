// Card editor CSS styles
export const editorStyles = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Noto Sans KR', sans-serif;
            background: linear-gradient(135deg, #0A2260 0%, #1A3368 100%);
            min-height: 100vh;
            color: white;
        }

        /* Header */
        .header {
            background: rgba(255, 255, 255, 0.05);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding: 20px 40px;
            min-height: 80px;
            display: flex;
            align-items: center;
            position: sticky;
            top: 0;
            z-index: 100;
            backdrop-filter: blur(10px);
        }

        .back-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 18px;
        }

        .back-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.05);
        }

        .btn {
            padding: 10px 20px;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            border: none;
            font-family: 'Noto Sans KR', sans-serif;
            display: flex;
            align-items: center;
            gap: 6px;
            white-space: nowrap;
        }

        .btn-secondary {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        .btn-primary {
            background: white;
            color: #0A2260;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 16px rgba(255, 255, 255, 0.3);
        }

        .btn-primary:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }

        /* Mobile-first layout */
        .editor-layout {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .form-section {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 24px;
        }

        .preview-section {
            position: sticky;
            top: 80px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 20px;
            max-height: 500px;
        }

        .section-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 8px;
            opacity: 0.9;
        }

        .form-label .required {
            color: #ff6b6b;
        }

        .form-input, .form-textarea {
            width: 100%;
            padding: 12px 16px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            color: white;
            font-size: 14px;
            font-family: 'Noto Sans KR', sans-serif;
            transition: all 0.3s;
        }

        .form-input:focus, .form-textarea:focus {
            outline: none;
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.4);
        }

        .form-input::placeholder, .form-textarea::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }

        .form-textarea {
            resize: vertical;
            min-height: 80px;
        }

        /* Image upload */
        .image-upload-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
        }

        .avatar-preview {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            border: 2px dashed rgba(255, 255, 255, 0.3);
            position: relative;
        }

        .avatar-preview img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .avatar-preview i {
            font-size: 32px;
            opacity: 0.5;
        }

        .file-input-wrapper {
            position: relative;
            overflow: hidden;
        }

        .file-input-wrapper input[type="file"] {
            position: absolute;
            left: -9999px;
        }

        .file-input-label {
            padding: 8px 16px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            cursor: pointer;
            font-size: 13px;
            transition: all 0.3s;
            display: inline-block;
        }

        .file-input-label:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        /* Theme selector */
        .theme-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            gap: 12px;
            margin-bottom: 20px;
        }

        .theme-item {
            padding: 12px;
            border: 2px solid transparent;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s;
            text-align: center;
            background: rgba(255, 255, 255, 0.05);
        }

        .theme-item:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        .theme-item.active {
            border-color: white;
            background: rgba(255, 255, 255, 0.15);
        }

        .theme-color {
            width: 60px;
            height: 60px;
            border-radius: 8px;
            margin: 0 auto 8px;
        }

        .theme-name {
            font-size: 12px;
            font-weight: 500;
        }

        /* Links section */
        .links-section {
            margin-top: 20px;
        }

        .link-item {
            display: flex;
            gap: 8px;
            margin-bottom: 12px;
            align-items: center;
        }

        .link-item input {
            flex: 1;
        }

        .btn-icon {
            padding: 10px;
            min-width: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .btn-danger {
            background: rgba(255, 107, 107, 0.2);
            color: #ff6b6b;
            border: 1px solid rgba(255, 107, 107, 0.3);
        }

        .btn-danger:hover {
            background: rgba(255, 107, 107, 0.3);
        }

        .btn-add {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px dashed rgba(255, 255, 255, 0.3);
        }

        .btn-add:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.5);
        }

        /* Preview card */
        .preview-card {
            background: #0A2260;
            border-radius: 16px;
            padding: 24px;
            color: white;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            max-width: 400px;
            margin: 0 auto;
        }

        .preview-header {
            display: flex;
            gap: 16px;
            margin-bottom: 20px;
        }

        .preview-avatar {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            overflow: hidden;
        }

        .preview-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .preview-info {
            flex: 1;
        }

        .preview-name {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 4px;
        }

        .preview-title {
            font-size: 14px;
            opacity: 0.8;
            margin-bottom: 2px;
        }

        .preview-company {
            font-size: 13px;
            opacity: 0.7;
        }

        .preview-contacts {
            margin-bottom: 20px;
        }

        .preview-contact-item {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;
            font-size: 13px;
            opacity: 0.9;
        }

        .preview-links {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .preview-link {
            padding: 8px 16px;
            background: rgba(255, 255, 255, 0.15);
            border-radius: 20px;
            font-size: 12px;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .save-footer {
            position: sticky;
            bottom: 0;
            background: linear-gradient(to top, rgba(10, 34, 96, 1) 0%, rgba(10, 34, 96, 0.98) 100%);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding: 20px;
            display: flex;
            justify-content: center;
            backdrop-filter: blur(10px);
            box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
        }

        .save-footer .btn-primary {
            width: 100%;
            max-width: 400px;
            justify-content: center;
            font-size: 18px;
            font-weight: 700;
            padding: 16px 40px;
            border-radius: 12px;
            background: linear-gradient(135deg, #ffc107 0%, #ffcd38 100%);
            color: #0A2260;
            box-shadow: 0 4px 16px rgba(255, 193, 7, 0.4);
        }

        .save-footer .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 193, 7, 0.6);
        }

        .save-footer .btn-primary:disabled {
            opacity: 0.6;
            transform: none;
            cursor: not-allowed;
        }

        .loading-spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(10, 34, 96, 0.3);
            border-top-color: #0A2260;
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        /* Desktop layout */
        @media (min-width: 1024px) {
            .editor-layout {
                flex-direction: row;
                gap: 40px;
            }

            .form-section {
                flex: 1;
            }

            .preview-section {
                width: 450px;
                flex-shrink: 0;
            }

            .theme-grid {
                grid-template-columns: repeat(5, 1fr);
            }

            .header-actions {
                display: flex;
            }
        }

        /* Tablet */
        @media (min-width: 768px) and (max-width: 1023px) {
            .theme-grid {
                grid-template-columns: repeat(4, 1fr);
            }

            .preview-card {
                max-width: 100%;
            }
        }

        /* Mobile */
        @media (max-width: 767px) {
            .header {
                padding: 12px 16px;
                flex-wrap: nowrap;
            }

            .logo {
                font-size: 18px;
                letter-spacing: 3px;
            }

            .header-actions {
                display: flex;
                flex-direction: row;
                gap: 6px;
            }

            .header-actions .btn {
                font-size: 12px;
                padding: 8px 12px;
            }

            .header-actions .btn span {
                display: none;
            }

            .header-actions .btn i {
                margin: 0;
            }

            .container {
                padding: 16px;
            }

            .form-section, .preview-section {
                padding: 20px 16px;
            }

            .section-title {
                font-size: 16px;
            }

            .theme-grid {
                grid-template-columns: repeat(3, 1fr);
                gap: 8px;
            }

            .theme-color {
                width: 50px;
                height: 50px;
            }

            .theme-name {
                font-size: 11px;
            }

            .preview-section {
                position: relative;
                top: 0;
                max-height: none;
                padding: 12px;
            }

            .preview-card {
                padding: 16px;
                max-width: 100%;
                transform: scale(0.85);
                transform-origin: top center;
                margin: -10px auto 0;
            }

            .preview-avatar {
                width: 48px;
                height: 48px;
                font-size: 18px;
            }

            .preview-name {
                font-size: 16px;
            }

            .preview-title {
                font-size: 13px;
            }

            .preview-company {
                font-size: 12px;
            }

            .preview-contact-item {
                font-size: 12px;
            }

            .preview-link {
                font-size: 11px;
                padding: 6px 12px;
            }

            .btn {
                font-size: 13px;
                padding: 8px 16px;
            }

            .form-input, .form-textarea {
                font-size: 16px; /* Prevent zoom on iOS */
            }

            .save-footer {
                padding: 0;
                background: transparent;
                border: none;
                position: static;
                margin-top: 20px;
            }

            .save-footer .btn-primary {
                width: 100%;
            }
        }
`;
