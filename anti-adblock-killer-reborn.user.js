// ==UserScript==
// @name         Anti-Adblock Killer | Reborn AI Edition
// @namespace    https://lucaszone.vn
// @version      2025.4
// @description  Advanced anti-adblock bypass system with AI-powered detection and countermeasures
// @author       Johnny Inc.
// @match        *://*/*
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @resource     aiModelData https://raw.githubusercontent.com/willbelove1/anti-adblock-killer-reborn-2025/refs/heads/main/ai-model-data.json
// @run-at       document-start
// @connect      *
// ==/UserScript==

(function() {
    'use strict';

    /**
     * AI-Enhanced Anti-Adblock Killer
     * Sử dụng AI để phát hiện và vô hiệu hóa các hệ thống anti-adblock
     */
    class AntiAdblockKillerAI {
        constructor() {
            this.config = {
                debug: false,
                enableAI: true,
                enableHeuristics: true,
                enablePatternMatching: true,
                enableBehaviorEmulation: true,
                enableSiteSpecific: true,
                enableSelfLearning: true,

                // Cấu hình AI
                aiConfig: {
                    modelVersion: '2025.4',
                    confidenceThreshold: 0.75,
                    maxCacheSize: 1000,
                    cacheTTL: 7 * 24 * 60 * 60 * 1000, // 7 ngày
                    useLocalModel: true,
                    useFallbackHeuristics: true
                },

                // Từ khóa phát hiện anti-adblock
                antiAdblockKeywords: [
                    'adblock', 'ad blocker', 'adblocker', 'ad-blocker',
                    'adblockdetected', 'adblock-detected', 'disable-adblock',
                    'fuckadblock', 'blockadblock', 'adblockanalytics',
                    'adshield', 'addefend', 'admiral', 'funding', 'monetization',
                    'admiral', 'prebid', 'adsense', 'adblock-analytics',
                    'adblock-detector', 'ad-detector', 'adblock-notice',
                    'adblock-modal', 'adblock-overlay', 'adblock-popup'
                ],

                // Cấu hình theo trang web cụ thể
                siteSpecific: {
                    'forbes.com': {
                        selectors: ['.adblock-wall', '.tp-modal', '.tp-backdrop'],
                        scripts: ['fbs_settings', 'forbes_ad'],
                        customFix: 'forbesAdblockFix'
                    },
                    'wired.com': {
                        selectors: ['.paywall-container', '.callout--warning'],
                        scripts: ['WIREDBlocker'],
                        customFix: 'wiredPaywallFix'
                    },
                    'nytimes.com': {
                        selectors: ['.gateway-container', '.modal__overlay'],
                        scripts: ['gatewayCreative'],
                        customFix: 'nytimesPaywallFix'
                    }
                },

                // Mẫu script anti-adblock phổ biến
                scriptPatterns: [
                    /AdBlock|ad blocker|adBlockDetected|blockAdBlock|adsBlocked|adBlockEnabled|canRunAds === undefined/i,
                    /document\.getElementById\(['"].*ad.*['"]\)/i,
                    /\.offsetHeight === 0/i,
                    /if\s*\(\s*window\.canRunAds === undefined\s*\)/i,
                    /adsbygoogle\.push\(\{\}\)/i,
                    /adsbygoogle\.loaded/i,
                    /\.getComputedStyle\(.*height/i,
                    /document\.createElement\(['"]div['"]\).*display:\s*none/i
                ]
            };

            // Khởi tạo các thành phần
            this.aiEngine = new AIEngine(this.config.aiConfig);
            this.patternMatcher = new PatternMatcher(this.config);
            this.behaviorEmulator = new BehaviorEmulator(this.config);
            this.domObserver = new DOMObserver(this);
            this.networkInterceptor = new NetworkInterceptor(this);
            this.siteSpecificHandler = new SiteSpecificHandler(this.config);
            this.selfLearningSystem = new SelfLearningSystem(this.config);

            // Trạng thái
            this.isInitialized = false;
            this.detectedAntiAdblock = false;
            this.appliedCountermeasures = [];
            this.stats = {
                scriptsNeutralized: 0,
                elementsRemoved: 0,
                requestsModified: 0,
                aiDetections: 0
            };
        }

        /**
         * Khởi tạo Anti-Adblock Killer
         */
        async initialize() {
            if (this.isInitialized) return;

            this.log('🚀 Initializing Anti-Adblock Killer AI Edition...');

            try {
                // Khởi tạo AI Engine
                if (this.config.enableAI) {
                    await this.aiEngine.initialize();
                }

                // Khởi tạo các thành phần khác
                this.patternMatcher.initialize();
                this.behaviorEmulator.initialize();
                this.networkInterceptor.initialize();
                this.domObserver.initialize();

                // Áp dụng các biện pháp chống anti-adblock cơ bản
                this.applyBasicCountermeasures();

                // Áp dụng các biện pháp theo trang web cụ thể
                if (this.config.enableSiteSpecific) {
                    this.siteSpecificHandler.applySiteSpecificFixes();
                }

                // Khởi tạo hệ thống tự học
                if (this.config.enableSelfLearning) {
                    this.selfLearningSystem.initialize();
                }

                // Đăng ký menu commands
                this.registerMenuCommands();

                this.isInitialized = true;
                this.log('✅ Anti-Adblock Killer AI Edition initialized successfully');

                // Phân tích trang web sau khi tải
                window.addEventListener('DOMContentLoaded', () => {
                    this.analyzePage();
                });

                // Phân tích lại sau khi trang web tải hoàn tất
                window.addEventListener('load', () => {
                    setTimeout(() => this.analyzePage(true), 1500);
                });
            } catch (error) {
                console.error('❌ Failed to initialize Anti-Adblock Killer:', error);
            }
        }

        /**
         * Ghi log debug
         */
        log(message) {
            if (this.config.debug) {
                console.log(`[AAK-AI] ${new Date().toLocaleTimeString()}: ${message}`);
            }
        }

        /**
         * Áp dụng các biện pháp chống anti-adblock cơ bản
         */
        applyBasicCountermeasures() {
            this.log('Applying basic countermeasures...');

            // Vô hiệu hóa các biến và hàm phát hiện adblock phổ biến
            this.neutralizeGlobalDetectors();

            // Tạo các phần tử quảng cáo giả
            this.createFakeAdElements();

            // Vô hiệu hóa các phương thức phát hiện adblock
            this.patchDetectionMethods();

            // Ngăn chặn các script phát hiện adblock
            this.interceptScripts();
        }

        /**
         * Vô hiệu hóa các biến và hàm phát hiện adblock phổ biến
         */
        neutralizeGlobalDetectors() {
            this.log('Neutralizing global adblock detectors...');

            // Tạo đối tượng quảng cáo giả
            const fakeAdObject = {
                isActive: false,
                isBlocked: false,
                exists: true,
                length: 1,
                display: 'block',
                clientHeight: 50,
                clientWidth: 300,
                offsetHeight: 50,
                offsetWidth: 300,
                style: {},
                addEventListener: () => {},
                appendChild: () => {},
                createElement: () => {},
                getElementsByTagName: () => [{}],
                querySelectorAll: () => [{}]
            };

            // Danh sách các thuộc tính cần vô hiệu hóa
            const props = {
                'adblock': false,
                'adblocker': false,
                'adBlocker': false,
                'isAdBlockActive': false,
                'isAdBlockEnabled': false,
                'canRunAds': true,
                'canShowAds': true,
                'isAdFree': false,
                'showAds': true,
                'adBlockEnabled': false,
                'adsAllowed': true,
                'adsAreBlocked': false,
                'FuckAdBlock': function() { this.onDetected = () => {}; this.onNotDetected = (f) => f(); },
                'BlockAdBlock': function() { this.onDetected = () => {}; this.onNotDetected = (f) => f(); },
                'AdBlockDetector': function() { return { detected: false }; },
                'googlefc': {},
                'adsbygoogle': { loaded: true, push: () => {} },
                '__gads': 'dummy_value',
                'adConfig': { loaded: true },
                'sas': { cmd: { push: () => {} } }
            };

            // Áp dụng các vô hiệu hóa
            for (const prop in props) {
                try {
                    Object.defineProperty(window, prop, {
                        value: props[prop],
                        writable: false,
                        configurable: true
                    });
                } catch (e) {
                    this.log(`Failed to neutralize ${prop}: ${e.message}`);
                }
            }
        }

        /**
         * Tạo các phần tử quảng cáo giả
         */
        createFakeAdElements() {
            this.log('Creating fake ad elements...');

            // Tạo container cho các phần tử quảng cáo giả
            const adContainer = document.createElement('div');
            adContainer.id = 'aak-fake-ads';
            adContainer.style.position = 'absolute';
            adContainer.style.opacity = '0.01';
            adContainer.style.height = '1px';
            adContainer.style.width = '1px';
            adContainer.style.overflow = 'hidden';
            adContainer.style.pointerEvents = 'none';
            adContainer.style.zIndex = '-9999';

            // Tạo các phần tử quảng cáo giả với các kích thước phổ biến
            const adSizes = [
                [728, 90], [300, 250], [336, 280], [320, 50], [468, 60],
                [234, 60], [120, 600], [160, 600], [300, 600], [970, 250]
            ];

            // Tạo các phần tử quảng cáo giả với các class name phổ biến
            const adClassNames = [
                'ad-banner', 'ad-container', 'ad-wrapper', 'advertisement',
                'banner-ad', 'sponsored-content', 'ad-unit', 'adsense'
            ];

            adClassNames.forEach((className, index) => {
                const size = adSizes[index % adSizes.length];
                const fakeAd = document.createElement('div');
                fakeAd.className = className;
                fakeAd.id = `fake-ad-${index}`;
                fakeAd.style.width = `${size[0]}px`;
                fakeAd.style.height = `${size[1]}px`;
                fakeAd.style.background = 'transparent';
                fakeAd.innerHTML = '<span>Advertisement</span>';
                adContainer.appendChild(fakeAd);

                // Tạo iframe giả cho quảng cáo
                if (index % 3 === 0) {
                    const fakeIframe = document.createElement('iframe');
                    fakeIframe.className = 'ad-iframe';
                    fakeIframe.id = `ad-iframe-${index}`;
                    fakeIframe.style.width = `${size[0]}px`;
                    fakeIframe.style.height = `${size[1]}px`;
                    fakeIframe.style.border = 'none';
                    adContainer.appendChild(fakeIframe);
                }
            });

            // Thêm vào document khi sẵn sàng
            if (document.body) {
                document.body.appendChild(adContainer);
            } else {
                document.addEventListener('DOMContentLoaded', () => {
                    document.body.appendChild(adContainer);
                });
            }

            // Tạo các biến toàn cục cho quảng cáo
            window.google_ad_status = 1;
            window.google_ad_height = 250;
            window.google_ad_width = 300;
            window.google_ad_format = '300x250';
            window.google_ad_client = 'ca-pub-1234567890123456';
        }

        /**
         * Vô hiệu hóa các phương thức phát hiện adblock
         */
        patchDetectionMethods() {
            this.log('Patching detection methods...');

            // Vô hiệu hóa getComputedStyle để ngăn phát hiện phần tử bị ẩn
            const originalGetComputedStyle = window.getComputedStyle;
            window.getComputedStyle = function(element, pseudoElt) {
                const result = originalGetComputedStyle.call(window, element, pseudoElt);

                // Kiểm tra nếu element có thể là quảng cáo
                if (element.id && (element.id.includes('ad') || element.id.includes('banner'))) {
                    // Tạo proxy để giả mạo các thuộc tính liên quan đến hiển thị
                    return new Proxy(result, {
                        get: function(target, prop) {
                            if (prop === 'display') return 'block';
                            if (prop === 'visibility') return 'visible';
                            if (prop === 'opacity') return '1';
                            if (prop === 'height' || prop === 'width') {
                                const value = target[prop];
                                return value === '0px' ? '10px' : value;
                            }
                            return target[prop];
                        }
                    });
                }

                return result;
            };

            // Vô hiệu hóa getBoundingClientRect để ngăn phát hiện kích thước
            const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
            Element.prototype.getBoundingClientRect = function() {
                const result = originalGetBoundingClientRect.call(this);

                // Kiểm tra nếu element có thể là quảng cáo
                if (this.id && (this.id.includes('ad') || this.id.includes('banner')) ||
                    this.className && (String(this.className).includes('ad') || String(this.className).includes('banner'))) {

                    // Tạo kết quả giả với kích thước hợp lý
                    return {
                        top: result.top,
                        right: result.right,
                        bottom: result.bottom,
                        left: result.left,
                        width: result.width > 0 ? result.width : 10,
                        height: result.height > 0 ? result.height : 10,
                        x: result.x,
                        y: result.y,
                        toJSON: result.toJSON
                    };
                }

                return result;
            };

            // Vô hiệu hóa document.getElementById để ngăn phát hiện phần tử quảng cáo
            const originalGetElementById = document.getElementById;
            document.getElementById = function(id) {
                const element = originalGetElementById.call(document, id);

                // Nếu element không tồn tại và id có thể là quảng cáo
                if (!element && (id.includes('ad') || id.includes('banner'))) {
                    // Tạo phần tử giả
                    const fakeElement = document.createElement('div');
                    fakeElement.id = id;
                    fakeElement.style.display = 'block';
                    fakeElement.style.height = '10px';
                    fakeElement.style.width = '10px';
                    return fakeElement;
                }

                return element;
            };
        }

        /**
         * Ngăn chặn các script phát hiện adblock
         */
        interceptScripts() {
            this.log('Setting up script interception...');

            // Lưu tham chiếu đến this
            const self = this;

            // Ngăn chặn tạo script
            const originalCreateElement = document.createElement;
            document.createElement = function(tagName) {
                const element = originalCreateElement.call(document, tagName);

                if (tagName.toLowerCase() === 'script') {
                    // Theo dõi thay đổi thuộc tính src
                    const originalSetAttribute = element.setAttribute;
                    element.setAttribute = function(name, value) {
                        if (name === 'src' && value) {
                            const shouldBlock = self.patternMatcher.shouldBlockScript(value);
                            if (shouldBlock) {
                                self.log(`Neutralized script src: ${value}`);
                                self.stats.scriptsNeutralized++;
                                arguments[1] = 'data:text/javascript,console.log("Script neutralized by AAK-AI");';
                            }
                        }
                        return originalSetAttribute.apply(this, arguments);
                    };

                    // Theo dõi nội dung script
                    const originalDescriptor = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'text') ||
                                              Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');

                    if (originalDescriptor && originalDescriptor.set) {
                        Object.defineProperty(element, 'text', {
                            set: function(value) {
                                if (value) {
                                    const analysis = self.analyzeScriptContent(value);
                                    if (analysis.isAntiAdblock) {
                                        self.log(`Neutralized inline script: ${analysis.reason}`);
                                        self.stats.scriptsNeutralized++;
                                        value = self.neutralizeScript(value, analysis);
                                    }
                                }
                                return originalDescriptor.set.call(this, value);
                            },
                            get: originalDescriptor.get
                        });
                    }
                }

                return element;
            };
        }

        /**
         * Phân tích nội dung script để phát hiện anti-adblock
         */
        analyzeScriptContent(content) {
            // Kiểm tra bằng pattern matching
            const patternResult = this.patternMatcher.analyzeScript(content);
            if (patternResult.isAntiAdblock) {
                return patternResult;
            }

            // Kiểm tra bằng AI nếu có sẵn
            if (this.config.enableAI && this.aiEngine.isReady) {
                const aiResult = this.aiEngine.analyzeScript(content);
                if (aiResult.isAntiAdblock) {
                    this.stats.aiDetections++;
                    return aiResult;
                }
            }

            return { isAntiAdblock: false };
        }

        /**
         * Vô hiệu hóa script anti-adblock
         */
        neutralizeScript(content, analysis) {
            // Nếu có thông tin chi tiết về cách vô hiệu hóa
            if (analysis.neutralizationStrategy) {
                return analysis.neutralizationStrategy(content);
            }

            // Mặc định: thay thế các hàm phát hiện adblock
            let neutralized = content;

            // Thay thế các pattern phát hiện adblock phổ biến
            neutralized = neutralized.replace(/if\s*\(\s*window\.canRunAds === undefined\s*\)/g, 'if (false)');
            neutralized = neutralized.replace(/if\s*\(\s*document\.getElementById\(['"]\w*ad\w*['"]\)(\s*===\s*null|\s*==\s*null|\s*===\s*undefined|\s*==\s*undefined)\s*\)/g, 'if (false)');
            neutralized = neutralized.replace(/adblock/gi, 'adblock_disabled');
            neutralized = neutralized.replace(/AdBlock/g, 'AdBlock_disabled');
            neutralized = neutralized.replace(/blockAdBlock/g, 'blockAdBlock_disabled');
            neutralized = neutralized.replace(/fuckAdBlock/g, 'fuckAdBlock_disabled');

            // Thêm code để giả vờ quảng cáo đang hoạt động
            neutralized = `
                // Anti-Adblock Killer neutralized this script
                (function() {
                    window.canRunAds = true;
                    window.adsbygoogle = window.adsbygoogle || { loaded: true, push: function() {} };
                    window.google_ad_status = 1;
                })();

                // Original script (modified)
                ${neutralized}
            `;

            return neutralized;
        }

        /**
         * Phân tích trang web để phát hiện và vô hiệu hóa anti-adblock
         */
        async analyzePage(isFullScan = false) {
            this.log(`Analyzing page${isFullScan ? ' (full scan)' : ''}...`);

            // Phát hiện các phần tử anti-adblock
            const antiAdblockElements = this.detectAntiAdblockElements();

            if (antiAdblockElements.length > 0) {
                this.log(`Detected ${antiAdblockElements.length} anti-adblock elements`);
                this.detectedAntiAdblock = true;

                // Xóa các phần tử anti-adblock
                antiAdblockElements.forEach(element => {
                    element.remove();
                    this.stats.elementsRemoved++;
                });

                // Khôi phục scrolling nếu bị khóa
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';
            }

            // Phân tích sâu hơn với AI nếu là full scan
            if (isFullScan && this.config.enableAI && this.aiEngine.isReady) {
                this.log('Performing AI-powered page analysis...');
                const aiAnalysis = await this.aiEngine.analyzePage(document);

                if (aiAnalysis.isAntiAdblock) {
                    this.log(`AI detected anti-adblock: ${aiAnalysis.reason}`);
                    this.detectedAntiAdblock = true;
                    this.stats.aiDetections++;

                    // Áp dụng các biện pháp đối phó
                    if (aiAnalysis.countermeasures) {
                        this.applyAICountermeasures(aiAnalysis.countermeasures);
                    }
                }
            }

            // Cập nhật dữ liệu học tập
            if (this.config.enableSelfLearning && this.detectedAntiAdblock) {
                this.selfLearningSystem.learnFromDetection({
                    url: window.location.href,
                    hostname: window.location.hostname,
                    detectedElements: antiAdblockElements,
                    timestamp: Date.now()
                });
            }
        }

        /**
         * Phát hiện các phần tử anti-adblock
         */
        detectAntiAdblockElements() {
            const antiAdblockElements = [];

            // Các bộ chọn CSS phổ biến cho anti-adblock
            const selectors = [
                '.adblock-notice', '.adblock-wrapper', '.adblock-message',
                '.adblock-detector', '.ad-blocker-warning', '.ad-blocker-notice',
                '.ad-block-message', '.ad-block-notification', '.adblock-overlay',
                '.adblock-popup', '.adblock-modal', '.adblock-wall',
                '.paywall', '.subscription-wall', '.premium-wall',
                '[class*="adblock"]', '[id*="adblock"]',
                '[class*="ad-block"]', '[id*="ad-block"]'
            ];

            // Tìm các phần tử theo bộ chọn
            selectors.forEach(selector => {
                try {
                    const elements = document.querySelectorAll(selector);
                    elements.forEach(element => {
                        // Kiểm tra thêm để xác nhận đây là anti-adblock
                        if (this.isAntiAdblockElement(element)) {
                            antiAdblockElements.push(element);
                        }
                    });
                } catch (e) {
                    // Bỏ qua lỗi selector không hợp lệ
                }
            });

            // Tìm các phần tử overlay/modal có thể là anti-adblock
            const potentialOverlays = document.querySelectorAll('div[class*="modal"], div[class*="overlay"], div[class*="popup"]');
            potentialOverlays.forEach(element => {
                if (this.isAntiAdblockElement(element)) {
                    antiAdblockElements.push(element);
                }
            });

            return antiAdblockElements;
        }

        /**
         * Kiểm tra xem phần tử có phải là anti-adblock
         */
        isAntiAdblockElement(element) {
            // Kiểm tra text content
            const text = element.textContent.toLowerCase();
            const antiAdblockPhrases = [
                'ad blocker', 'adblocker', 'disable adblock', 'turn off ad blocker',
                'disable your ad blocker', 'whitelist', 'ad-free', 'advertising',
                'please disable', 'support us', 'support our site', 'support our website'
            ];

            if (antiAdblockPhrases.some(phrase => text.includes(phrase))) {
                return true;
            }

            // Kiểm tra style
            const style = window.getComputedStyle(element);
            const isOverlay = (style.position === 'fixed' || style.position === 'absolute') &&
                             (parseInt(style.zIndex) > 1000) &&
                             (style.display !== 'none') &&
                             (element.offsetWidth > window.innerWidth * 0.5 || element.offsetHeight > window.innerHeight * 0.5);

            if (isOverlay) {
                // Kiểm tra thêm nếu là overlay
                return text.length > 20 && (
                    text.includes('adblock') ||
                    text.includes('ad block') ||
                    text.includes('disable') ||
                    text.includes('whitelist')
                );
            }

            // Sử dụng AI để phân tích nếu có sẵn
            if (this.config.enableAI && this.aiEngine.isReady) {
                const aiResult = this.aiEngine.analyzeElement(element);
                if (aiResult.isAntiAdblock && aiResult.confidence > 0.8) {
                    this.stats.aiDetections++;
                    return true;
                }
            }

            return false;
        }

        /**
         * Áp dụng các biện pháp đối phó do AI đề xuất
         */
        applyAICountermeasures(countermeasures) {
            this.log('Applying AI-recommended countermeasures...');

            countermeasures.forEach(measure => {
                try {
                    switch (measure.type) {
                        case 'removeElement':
                            if (measure.selector) {
                                document.querySelectorAll(measure.selector).forEach(el => {
                                    el.remove();
                                    this.stats.elementsRemoved++;
                                });
                            }
                            break;

                        case 'injectScript':
                            if (measure.code) {
                                const script = document.createElement('script');
                                script.textContent = measure.code;
                                document.head.appendChild(script);
                            }
                            break;

                        case 'modifyDOM':
                            if (measure.action && measure.target) {
                                try {
                                    // Thay thế eval bằng Function constructor
                                    const safeExecute = new Function('target', measure.action);
                                    safeExecute(document.querySelector(measure.target));
                                } catch (e) {
                                    this.log(`Failed to execute DOM modification: ${e.message}`);
                                }
                            }
                            break;

                        case 'setStyle':
                            if (measure.selector && measure.styles) {
                                const style = document.createElement('style');
                                style.textContent = `${measure.selector} { ${measure.styles} }`;
                                document.head.appendChild(style);
                            }
                            break;
                    }

                    this.appliedCountermeasures.push(measure);
                } catch (e) {
                    this.log(`Failed to apply countermeasure: ${e.message}`);
                }
            });
        }

        /**
         * Đăng ký menu commands
         */
        registerMenuCommands() {
            if (typeof GM_registerMenuCommand !== 'undefined') {
                GM_registerMenuCommand('Toggle Debug Mode', () => {
                    this.config.debug = !this.config.debug;
                    this.log(`Debug mode ${this.config.debug ? 'enabled' : 'disabled'}`);
                });

                GM_registerMenuCommand('Show Statistics', () => {
                    alert(`Anti-Adblock Killer AI Statistics:
                    - Scripts neutralized: ${this.stats.scriptsNeutralized}
                    - Elements removed: ${this.stats.elementsRemoved}
                    - Requests modified: ${this.stats.requestsModified}
                    - AI detections: ${this.stats.aiDetections}
                    - Anti-adblock detected: ${this.detectedAntiAdblock ? 'Yes' : 'No'}
                    - Countermeasures applied: ${this.appliedCountermeasures.length}`);
                });

                GM_registerMenuCommand('Clear Learning Data', () => {
                    if (confirm('Are you sure you want to clear all learning data?')) {
                        this.selfLearningSystem.clearData();
                        alert('Learning data cleared successfully');
                    }
                });

                GM_registerMenuCommand('Force Rescan Page', () => {
                    this.analyzePage(true);
                    alert('Page rescanned for anti-adblock measures');
                });
            }
        }
    }

    /**
     * AI Engine - Phân tích và phát hiện anti-adblock bằng AI
     */
    class AIEngine {
        constructor(config) {
            this.config = config;
            this.isReady = false;
            this.model = null;
            this.cache = new Map();
            this.fallbackEngine = new FallbackEngine();
            this.saveTimeout = null;
        }

        /**
         * Khởi tạo AI Engine
         */
        async initialize() {
            console.log('🧠 Initializing AI Engine...');

            try {
                // Kiểm tra xem có thể sử dụng AI local không
                if (this.config.useLocalModel && 'ai' in window && 'languageModel' in window.ai) {
                    await this.initializeLocalModel();
                } else {
                    // Sử dụng mô hình nhẹ được nhúng trong script
                    await this.initializeLightweightModel();
                }

                // Khởi tạo cache
                await this.initializeCache();

                this.isReady = true;
                console.log('✅ AI Engine initialized successfully');
            } catch (error) {
                console.error('❌ Failed to initialize AI Engine:', error);
                // Fallback to heuristic-only mode
                this.isReady = this.config.useFallbackHeuristics;
            }
        }

        /**
         * Khởi tạo mô hình AI local (như Gemini Nano)
         */
        async initializeLocalModel() {
            try {
                const capabilities = await window.ai.languageModel.capabilities();

                if (capabilities.available === 'readily') {
                    this.model = await window.ai.languageModel.create({
                        systemPrompt: `You are an AI anti-adblock detector. Analyze content and determine if it's an anti-adblock mechanism.

                        Respond with JSON format:
                        {
                            "isAntiAdblock": boolean,
                            "confidence": number (0-1),
                            "reason": "brief explanation",
                            "countermeasures": [
                                {
                                    "type": "removeElement"|"injectScript"|"modifyDOM"|"setStyle",
                                    "selector": "CSS selector" (if applicable),
                                    "code": "JavaScript code" (if applicable),
                                    "action": "action to perform" (if applicable),
                                    "styles": "CSS styles" (if applicable)
                                }
                            ]
                        }

                        Consider these as anti-adblock indicators:
                        - Messages about ad blockers
                        - Paywalls that appear when ads are blocked
                        - Overlays preventing content access
                        - Scripts checking for ad blockers
                        - DOM manipulations that restrict content when ads are blocked`
                    });

                    console.log('✅ Local AI model initialized');
                    return true;
                } else {
                    console.log('⚠️ Local AI model not readily available');
                    return false;
                }
            } catch (error) {
                console.error('❌ Failed to initialize local AI model:', error);
                return false;
            }
        }

        /**
         * Khởi tạo mô hình AI nhẹ được nhúng trong script
         */
        async initializeLightweightModel() {
            try {
                // Tải dữ liệu mô hình từ resource
                let modelData = null;

                if (typeof GM_getResourceText !== 'undefined') {
                    try {
                        const modelText = GM_getResourceText('aiModelData');
                        modelData = JSON.parse(modelText);
                    } catch (e) {
                        console.log('⚠️ Could not load AI model from resources:', e.message);
                    }
                }

                // Nếu không có dữ liệu mô hình, sử dụng mô hình mặc định
                if (!modelData) {
                    modelData = {
                        version: '2025.4',
                        keywords: [
                            {word: 'adblock', weight: 0.8},
                            {word: 'ad blocker', weight: 0.8},
                            {word: 'disable', weight: 0.5},
                            {word: 'whitelist', weight: 0.7},
                            {word: 'support us', weight: 0.4},
                            {word: 'subscription', weight: 0.3},
                            {word: 'premium', weight: 0.3},
                            {word: 'pay', weight: 0.3},
                            {word: 'remove ads', weight: 0.6}
                        ],
                        patterns: [
                            {regex: 'adblock|ad[-\\s]?block|ad blocker', weight: 0.8},
                            {regex: 'disable|turn off|remove', weight: 0.5},
                            {regex: 'whitelist|white[-\\s]?list', weight: 0.7},
                            {regex: 'subscribe|subscription|premium|paid', weight: 0.4},
                            {regex: 'support|donate|contribution', weight: 0.3}
                        ],
                        scriptPatterns: [
                            {regex: 'adblock|ad[-\\s]?block|ad blocker', weight: 0.7},
                            {regex: 'document\\.getElementById\\([\'"].*ad.*[\'"]\\)', weight: 0.8},
                            {regex: '\\.offsetHeight === 0', weight: 0.9},
                            {regex: 'window\\.canRunAds === undefined', weight: 0.9},
                            {regex: 'adsbygoogle\\.push\\(\\{\\}\\)', weight: 0.8}
                        ],
                        thresholds: {
                            text: 0.7,
                            element: 0.75,
                            script: 0.8
                        }
                    };
                }

                this.lightModel = modelData;
                console.log('✅ Lightweight AI model initialized');
                return true;
            } catch (error) {
                console.error('❌ Failed to initialize lightweight AI model:', error);
                return false;
            }
        }

        /**
         * Khởi tạo cache
         */
        async initializeCache() {
            try {
                // Tải cache từ localStorage
                if (typeof GM_getValue !== 'undefined') {
                    const cachedData = GM_getValue('aak-ai-cache', null);
                    if (cachedData) {
                        const data = JSON.parse(cachedData);
                        const now = Date.now();

                        // Lọc các entry chưa hết hạn
                        Object.entries(data).forEach(([key, value]) => {
                            if (now - value.timestamp < this.config.cacheTTL) {
                                this.cache.set(key, value.result);
                            }
                        });
                    }
                }

                console.log(`📦 AI Cache initialized with ${this.cache.size} entries`);
                return true;
            } catch (error) {
                console.error('❌ Failed to initialize AI cache:', error);
                return false;
            }
        }

        /**
         * Phân tích script để phát hiện anti-adblock
         */
        analyzeScript(content) {
            // Kiểm tra cache
            const cacheKey = this.generateCacheKey(content);
            if (this.cache.has(cacheKey)) {
                return this.cache.get(cacheKey);
            }

            let result;

            // Sử dụng mô hình local nếu có
            if (this.model) {
                result = this.analyzeWithLocalModel(content, 'script');
            } else if (this.lightModel) {
                result = this.analyzeWithLightModel(content, 'script');
            } else {
                result = this.fallbackEngine.analyzeScript(content);
            }

            // Lưu vào cache
            this.cache.set(cacheKey, result);
            this.saveCache();

            return result;
        }

        /**
         * Phân tích phần tử để phát hiện anti-adblock
         */
        analyzeElement(element) {
            // Trích xuất text và attributes
            const text = element.textContent.trim();
            const className = element.className || '';
            const id = element.id || '';
            const tagName = element.tagName.toLowerCase();

            // Tạo fingerprint cho element
            const fingerprint = `${tagName}|${className}|${id}|${text.substring(0, 50)}`;
            const cacheKey = this.generateCacheKey(fingerprint);

            // Kiểm tra cache
            if (this.cache.has(cacheKey)) {
                return this.cache.get(cacheKey);
            }

            let result;

            // Sử dụng mô hình local nếu có
            if (this.model) {
                result = this.analyzeWithLocalModel(element, 'element');
            } else if (this.lightModel) {
                result = this.analyzeWithLightModel(text, 'element', {className, id, tagName});
            } else {
                result = this.fallbackEngine.analyzeElement(element);
            }

            // Lưu vào cache
            this.cache.set(cacheKey, result);
            this.saveCache();

            return result;
        }

        /**
         * Phân tích trang web để phát hiện anti-adblock
         */
        async analyzePage(document) {
            // Tạo fingerprint cho trang web
            const url = window.location.href;
            const title = document.title;
            const metaDescription = document.querySelector('meta[name="description"]')?.content || '';

            const fingerprint = `${url}|${title}|${metaDescription}`;
            const cacheKey = this.generateCacheKey(fingerprint);

            // Kiểm tra cache
            if (this.cache.has(cacheKey)) {
                return this.cache.get(cacheKey);
            }

            let result;

            // Sử dụng mô hình local nếu có
            if (this.model) {
                result = await this.analyzePageWithLocalModel(document);
            } else if (this.lightModel) {
                result = this.analyzePageWithLightModel(document);
            } else {
                result = this.fallbackEngine.analyzePage(document);
            }

            // Lưu vào cache
            this.cache.set(cacheKey, result);
            this.saveCache();

            return result;
        }

        /**
         * Phân tích với mô hình AI local
         */
        async analyzeWithLocalModel(content, type) {
            try {
                let prompt;

                if (type === 'script') {
                    prompt = `Analyze this script for anti-adblock mechanisms:
                    \`\`\`javascript
                    ${typeof content === 'string' ? content.substring(0, 1000) : 'Non-string content'}
                    \`\`\``;
                } else if (type === 'element' && content instanceof Element) {
                    const element = content;
                    const html = element.outerHTML.substring(0, 500);
                    const text = element.textContent.trim().substring(0, 300);
                    const className = element.className || '';
                    const id = element.id || '';

                    prompt = `Analyze this HTML element for anti-adblock mechanisms:

                    HTML: \`${html}\`
                    Text content: "${text}"
                    Class: "${className}"
                    ID: "${id}"`;
                } else {
                    return { isAntiAdblock: false, confidence: 0, reason: 'Invalid content type' };
                }

                const response = await this.model.prompt(prompt);
                let parsed;

                try {
                    parsed = JSON.parse(response);
                } catch (e) {
                    // Nếu không phân tích được JSON, tìm kiếm các từ khóa
                    const lowerResponse = response.toLowerCase();
                    parsed = {
                        isAntiAdblock: lowerResponse.includes('anti-adblock') || lowerResponse.includes('is anti-adblock: true'),
                        confidence: lowerResponse.includes('high confidence') ? 0.9 :
                                   lowerResponse.includes('medium confidence') ? 0.7 : 0.5,
                        reason: 'AI analysis (non-JSON response)'
                    };
                }

                return {
                    isAntiAdblock: parsed.isAntiAdblock || false,
                    confidence: Math.min(Math.max(parsed.confidence || 0, 0), 1),
                    reason: parsed.reason || 'AI analysis',
                    countermeasures: parsed.countermeasures || []
                };
            } catch (error) {
                console.error('AI analysis error:', error);
                return { isAntiAdblock: false, confidence: 0, reason: 'AI analysis failed' };
            }
        }

        /**
         * Phân tích trang web với mô hình AI local
         */
        async analyzePageWithLocalModel(document) {
            try {
                // Trích xuất thông tin quan trọng từ trang web
                const title = document.title;
                const url = window.location.href;
                const metaTags = Array.from(document.querySelectorAll('meta[name], meta[property]'))
                    .map(meta => `${meta.getAttribute('name') || meta.getAttribute('property')}: ${meta.getAttribute('content')}`)
                    .join('\n')
                    .substring(0, 500);

                // Tìm các phần tử có thể là anti-adblock
                const potentialElements = Array.from(document.querySelectorAll('div[class*="modal"], div[class*="overlay"], div[class*="popup"], div[class*="adblock"], div[class*="paywall"]'))
                    .slice(0, 5)
                    .map(el => ({
                        tag: el.tagName.toLowerCase(),
                        id: el.id || '',
                        class: el.className || '',
                        text: el.textContent.trim().substring(0, 100)
                    }));

                const prompt = `Analyze this webpage for anti-adblock mechanisms:

                URL: ${url}
                Title: ${title}
                Meta tags: ${metaTags}

                Potential anti-adblock elements:
                ${JSON.stringify(potentialElements, null, 2)}

                Is there an anti-adblock mechanism on this page? If yes, what countermeasures would you recommend?`;

                const response = await this.model.prompt(prompt);
                let parsed;

                try {
                    parsed = JSON.parse(response);
                } catch (e) {
                    // Nếu không phân tích được JSON, tìm kiếm các từ khóa
                    const lowerResponse = response.toLowerCase();
                    parsed = {
                        isAntiAdblock: lowerResponse.includes('anti-adblock') || lowerResponse.includes('is anti-adblock: true'),
                        confidence: lowerResponse.includes('high confidence') ? 0.9 :
                                   lowerResponse.includes('medium confidence') ? 0.7 : 0.5,
                        reason: 'AI page analysis (non-JSON response)'
                    };

                    // Trích xuất countermeasures nếu có
                    if (lowerResponse.includes('countermeasure') || lowerResponse.includes('recommend')) {
                        const recommendations = response.split(/countermeasures|recommendations|suggest/i)[1] || '';
                        parsed.countermeasures = this.extractCountermeasuresFromText(recommendations);
                    }
                }

                return {
                    isAntiAdblock: parsed.isAntiAdblock || false,
                    confidence: Math.min(Math.max(parsed.confidence || 0, 0), 1),
                    reason: parsed.reason || 'AI page analysis',
                    countermeasures: parsed.countermeasures || []
                };
            } catch (error) {
                console.error('AI page analysis error:', error);
                return { isAntiAdblock: false, confidence: 0, reason: 'AI page analysis failed' };
            }
        }

        /**
         * Trích xuất countermeasures từ text
         */
        extractCountermeasuresFromText(text) {
            const countermeasures = [];

            // Tìm các selector
            const selectorMatches = text.match(/selector[s]?:?\s*["']([^"']+)["']/gi);
            if (selectorMatches) {
                selectorMatches.forEach(match => {
                    const selector = match.replace(/selector[s]?:?\s*["']([^"']+)["']/i, '$1');
                    countermeasures.push({
                        type: 'removeElement',
                        selector: selector
                    });
                });
            }

            // Tìm các đoạn code
            const codeMatches = text.match(/code:?\s*["']([^"']+)["']/gi);
            if (codeMatches) {
                codeMatches.forEach(match => {
                    const code = match.replace(/code:?\s*["']([^"']+)["']/i, '$1');
                    countermeasures.push({
                        type: 'injectScript',
                        code: code
                    });
                });
            }

            // Tìm các style
            const styleMatches = text.match(/style[s]?:?\s*["']([^"']+)["']/gi);
            if (styleMatches) {
                styleMatches.forEach(match => {
                    const styles = match.replace(/style[s]?:?\s*["']([^"']+)["']/i, '$1');
                    // Tìm selector gần nhất
                    const nearestSelectorMatch = text.match(/selector[s]?:?\s*["']([^"']+)["']/i);
                    const selector = nearestSelectorMatch ?
                        nearestSelectorMatch[1] :
                        '.adblock-wall, .adblock-detector, .ad-blocker-warning';

                    countermeasures.push({
                        type: 'setStyle',
                        selector: selector,
                        styles: styles
                    });
                });
            }

            return countermeasures;
        }

        /**
         * Phân tích với mô hình AI nhẹ
         */
        analyzeWithLightModel(content, type, metadata = {}) {
            try {
                let score = 0;
                let reasons = [];

                if (type === 'script') {
                    // Phân tích script với các pattern
                    this.lightModel.scriptPatterns.forEach(pattern => {
                        const regex = new RegExp(pattern.regex, 'i');
                        if (regex.test(content)) {
                            score += pattern.weight;
                            reasons.push(`Script contains pattern: ${pattern.regex}`);
                        }
                    });
                } else if (type === 'element') {
                    // Phân tích text với các keyword
                    const lowerContent = content.toLowerCase();

                    this.lightModel.keywords.forEach(keyword => {
                        if (lowerContent.includes(keyword.word.toLowerCase())) {
                            score += keyword.weight;
                            reasons.push(`Contains keyword: ${keyword.word}`);
                        }
                    });

                    // Phân tích text với các pattern
                    this.lightModel.patterns.forEach(pattern => {
                        const regex = new RegExp(pattern.regex, 'i');
                        if (regex.test(lowerContent)) {
                            score += pattern.weight;
                            reasons.push(`Matches pattern: ${pattern.regex}`);
                        }
                    });

                    // Kiểm tra metadata
                    if (metadata.className && /adblock|ad[-\s]?block|ad blocker/i.test(metadata.className)) {
                        score += 0.5;
                        reasons.push('Class name indicates anti-adblock');
                    }

                    if (metadata.id && /adblock|ad[-\s]?block|ad blocker/i.test(metadata.id)) {
                        score += 0.5;
                        reasons.push('ID indicates anti-adblock');
                    }
                }

                // Áp dụng ngưỡng phù hợp
                const threshold = this.lightModel.thresholds[type] || 0.7;
                const confidence = Math.min(score, 1);
                const isAntiAdblock = confidence >= threshold;

                return {
                    isAntiAdblock,
                    confidence,
                    reason: reasons.join(', ') || 'Lightweight model analysis',
                    countermeasures: isAntiAdblock ? this.generateCountermeasures(type, metadata) : []
                };
            } catch (error) {
                console.error('Lightweight model analysis error:', error);
                return { isAntiAdblock: false, confidence: 0, reason: 'Lightweight model analysis failed' };
            }
        }

        /**
         * Phân tích trang web với mô hình AI nhẹ
         */
        analyzePageWithLightModel(document) {
            try {
                let score = 0;
                let reasons = [];

                // Kiểm tra title
                const title = document.title.toLowerCase();
                if (/adblock|ad blocker|disable|whitelist/i.test(title)) {
                    score += 0.5;
                    reasons.push('Page title indicates anti-adblock');
                }

                // Kiểm tra meta tags
                const metaTags = document.querySelectorAll('meta[name], meta[property]');
                for (const meta of metaTags) {
                    const content = meta.getAttribute('content')?.toLowerCase() || '';
                    if (/adblock|ad blocker|disable|whitelist/i.test(content)) {
                        score += 0.3;
                        reasons.push('Meta tag indicates anti-adblock');
                        break;
                    }
                }

                // Kiểm tra các phần tử có thể là anti-adblock
                const potentialElements = document.querySelectorAll('div[class*="modal"], div[class*="overlay"], div[class*="popup"], div[class*="adblock"], div[class*="paywall"]');
                let antiAdblockElementsCount = 0;

                for (const element of potentialElements) {
                    const text = element.textContent.toLowerCase();
                    const className = element.className.toLowerCase();
                    const id = element.id?.toLowerCase() || '';

                    let elementScore = 0;

                    // Kiểm tra text
                    this.lightModel.keywords.forEach(keyword => {
                        if (text.includes(keyword.word.toLowerCase())) {
                            elementScore += keyword.weight * 0.5;
                        }
                    });

                    // Kiểm tra class và id
                    if (/adblock|ad[-\s]?block|ad blocker/i.test(className) || /adblock|ad[-\s]?block|ad blocker/i.test(id)) {
                        elementScore += 0.5;
                    }

                    // Kiểm tra style
                    const style = window.getComputedStyle(element);
                    if ((style.position === 'fixed' || style.position === 'absolute') &&
                        (parseInt(style.zIndex) > 1000) &&
                        (style.display !== 'none')) {
                        elementScore += 0.3;
                    }

                    if (elementScore >= 0.7) {
                        antiAdblockElementsCount++;
                    }
                }

                if (antiAdblockElementsCount > 0) {
                    score += Math.min(antiAdblockElementsCount * 0.3, 0.9);
                    reasons.push(`Found ${antiAdblockElementsCount} potential anti-adblock elements`);
                }

                // Kiểm tra scripts
                const scripts = document.querySelectorAll('script:not([src])');
                let antiAdblockScriptsCount = 0;

                for (const script of scripts) {
                    const content = script.textContent;
                    let scriptScore = 0;

                    this.lightModel.scriptPatterns.forEach(pattern => {
                        const regex = new RegExp(pattern.regex, 'i');
                        if (regex.test(content)) {
                            scriptScore += pattern.weight * 0.5;
                        }
                    });

                    if (scriptScore >= 0.7) {
                        antiAdblockScriptsCount++;
                    }
                }

                if (antiAdblockScriptsCount > 0) {
                    score += Math.min(antiAdblockScriptsCount * 0.2, 0.8);
                    reasons.push(`Found ${antiAdblockScriptsCount} potential anti-adblock scripts`);
                }

                // Áp dụng ngưỡng
                const confidence = Math.min(score, 1);
                const isAntiAdblock = confidence >= 0.7;

                return {
                    isAntiAdblock,
                    confidence,
                    reason: reasons.join(', ') || 'Lightweight page analysis',
                    countermeasures: isAntiAdblock ? this.generatePageCountermeasures(document) : []
                };
            } catch (error) {
                console.error('Lightweight page analysis error:', error);
                return { isAntiAdblock: false, confidence: 0, reason: 'Lightweight page analysis failed' };
            }
        }

        /**
         * Tạo các biện pháp đối phó
         */
        generateCountermeasures(type, metadata = {}) {
            const countermeasures = [];

            if (type === 'element') {
                // Tạo selector dựa trên metadata
                let selector = '';

                if (metadata.id) {
                    selector = `#${metadata.id}`;
                } else if (metadata.className) {
                    selector = `.${metadata.className.split(' ')[0]}`;
                } else if (metadata.tagName) {
                    selector = metadata.tagName;
                }

                if (selector) {
                    countermeasures.push({
                        type: 'removeElement',
                        selector: selector
                    });

                    countermeasures.push({
                        type: 'setStyle',
                        selector: selector,
                        styles: 'display: none !important; visibility: hidden !important; opacity: 0 !important;'
                    });
                }
            } else if (type === 'script') {
                countermeasures.push({
                    type: 'injectScript',
                    code: `
                        window.canRunAds = true;
                        window.adsbygoogle = window.adsbygoogle || { loaded: true, push: function() {} };
                        window.google_ad_status = 1;
                    `
                });
            }

            return countermeasures;
        }

        /**
         * Tạo các biện pháp đối phó cho trang web
         */
        generatePageCountermeasures(document) {
            const countermeasures = [];

            // Xóa các phần tử anti-adblock phổ biến
            countermeasures.push({
                type: 'removeElement',
                selector: '.adblock-wall, .adblock-detector, .ad-blocker-warning, .adblock-notice, .adblock-message, .adblock-overlay, .adblock-popup, .adblock-modal, .paywall, .subscription-wall, .premium-wall, [class*="adblock"], [id*="adblock"], [class*="ad-block"], [id*="ad-block"]'
            });

            // Khôi phục scrolling
            countermeasures.push({
                type: 'setStyle',
                selector: 'html, body',
                styles: 'overflow: auto !important; position: static !important;'
            });

            // Ẩn overlay
            countermeasures.push({
                type: 'setStyle',
                selector: '.modal, .overlay, .popup, [class*="modal"], [class*="overlay"], [class*="popup"]',
                styles: 'display: none !important; visibility: hidden !important; opacity: 0 !important;'
            });

            // Inject script để vô hiệu hóa anti-adblock
            countermeasures.push({
                type: 'injectScript',
                code: `
                    window.canRunAds = true;
                    window.adsbygoogle = window.adsbygoogle || { loaded: true, push: function() {} };
                    window.google_ad_status = 1;

                    // Override adblock detection methods
                    const originalGetComputedStyle = window.getComputedStyle;
                    window.getComputedStyle = function(element, pseudoElt) {
                        const result = originalGetComputedStyle.call(window, element, pseudoElt);
                        if (element.id && (element.id.includes('ad') || element.id.includes('banner'))) {
                            return new Proxy(result, {
                                get: function(target, prop) {
                                    if (prop === 'display') return 'block';
                                    if (prop === 'visibility') return 'visible';
                                    if (prop === 'height' || prop === 'width') {
                                        const value = target[prop];
                                        return value === '0px' ? '10px' : value;
                                    }
                                    return target[prop];
                                }
                            });
                        }
                        return result;
                    };
                `
            });

            return countermeasures;
        }

        /**
         * Tạo cache key
         */
        generateCacheKey(content) {
            // Tạo hash đơn giản từ content
            let hash = 0;
            const str = String(content).substring(0, 1000);
            for (let i = 0; i < str.length; i++) {
                const char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash; // Convert to 32-bit integer
            }
            return `ai_${Math.abs(hash)}`;
        }

        /**
         * Lưu cache
         */
        saveCache() {
            if (typeof GM_setValue === 'undefined') return;

            // Throttle để tránh ghi quá nhiều
            if (this.saveTimeout) return;

            this.saveTimeout = setTimeout(() => {
                try {
                    const data = {};
                    const now = Date.now();

                    // Giới hạn kích thước cache
                    let entries = Array.from(this.cache.entries());
                    if (entries.length > this.config.maxCacheSize) {
                        entries = entries.slice(-this.config.maxCacheSize);
                        this.cache = new Map(entries);
                    }

                    this.cache.forEach((result, key) => {
                        data[key] = {
                            result,
                            timestamp: now
                        };
                    });

                    GM_setValue('aak-ai-cache', JSON.stringify(data));
                } catch (error) {
                    console.error('Failed to save AI cache:', error);
                }

                this.saveTimeout = null;
            }, 5000); // Lưu sau 5 giây
        }
    }

    /**
     * FallbackEngine - Phân tích không dùng AI
     */
    class FallbackEngine {
        constructor() {
            this.adKeywords = [
                'adblock', 'ad blocker', 'adblocker', 'ad-blocker',
                'disable', 'whitelist', 'support us', 'subscription',
                'premium', 'pay', 'remove ads', 'turn off'
            ];

            this.scriptPatterns = [
                /adblock|ad blocker|adblocker/i,
                /document\.getElementById\(['"].*ad.*['"]\)/i,
                /\.offsetHeight === 0/i,
                /window\.canRunAds === undefined/i,
                /adsbygoogle\.push\(\{\}\)/i
            ];
        }

        /**
         * Phân tích script
         */
        analyzeScript(content) {
            let score = 0;
            const reasons = [];

            // Kiểm tra các pattern
            this.scriptPatterns.forEach(pattern => {
                if (pattern.test(content)) {
                    score += 0.2;
                    reasons.push(`Contains pattern: ${pattern}`);
                }
            });

            // Kiểm tra các từ khóa
            this.adKeywords.forEach(keyword => {
                if (content.toLowerCase().includes(keyword)) {
                    score += 0.1;
                    reasons.push(`Contains keyword: ${keyword}`);
                }
            });

            // Kiểm tra các hàm phát hiện adblock phổ biến
            if (/FuckAdBlock|BlockAdBlock|AdBlockDetector/i.test(content)) {
                score += 0.3;
                reasons.push('Contains known anti-adblock library');
            }

            const confidence = Math.min(score, 1);
            const isAntiAdblock = confidence > 0.5;

            return {
                isAntiAdblock,
                confidence,
                reason: reasons.join(', ') || 'Fallback script analysis'
            };
        }

        /**
         * Phân tích phần tử
         */
        analyzeElement(element) {
            let score = 0;
            const reasons = [];

            // Kiểm tra text
            const text = element.textContent.toLowerCase();
            this.adKeywords.forEach(keyword => {
                if (text.includes(keyword)) {
                    score += 0.15;
                    reasons.push(`Contains keyword: ${keyword}`);
                }
            });

            // Kiểm tra class và id
            const className = element.className || '';
            const id = element.id || '';

            if (/adblock|ad[-\s]?block|ad blocker/i.test(className) || /adblock|ad[-\s]?block|ad blocker/i.test(id)) {
                score += 0.3;
                reasons.push('Class or ID indicates anti-adblock');
            }

            // Kiểm tra style
            const style = window.getComputedStyle(element);
            if ((style.position === 'fixed' || style.position === 'absolute') &&
                (parseInt(style.zIndex) > 1000) &&
                (style.display !== 'none')) {
                score += 0.2;
                reasons.push('Styling indicates overlay/modal');
            }

            const confidence = Math.min(score, 1);
            const isAntiAdblock = confidence > 0.5;

            return {
                isAntiAdblock,
                confidence,
                reason: reasons.join(', ') || 'Fallback element analysis'
            };
        }

        /**
         * Phân tích trang web
         */
        analyzePage(document) {
            let score = 0;
            const reasons = [];

            // Kiểm tra title
            const title = document.title.toLowerCase();
            if (/adblock|ad blocker|disable|whitelist/i.test(title)) {
                score += 0.2;
                reasons.push('Page title indicates anti-adblock');
            }

            // Kiểm tra các phần tử có thể là anti-adblock
            const selectors = [
                '.adblock-wall', '.adblock-detector', '.ad-blocker-warning',
                '.adblock-notice', '.adblock-message', '.adblock-overlay',
                '.adblock-popup', '.adblock-modal', '.paywall',
                '.subscription-wall', '.premium-wall'
            ];

            let matchCount = 0;
            selectors.forEach(selector => {
                if (document.querySelector(selector)) {
                    matchCount++;
                }
            });

            if (matchCount > 0) {
                score += Math.min(matchCount * 0.2, 0.6);
                reasons.push(`Found ${matchCount} anti-adblock elements`);
            }

            // Kiểm tra các overlay
            const overlays = document.querySelectorAll('div[style*="position: fixed"], div[style*="position:fixed"]');
            let overlayCount = 0;

            overlays.forEach(overlay => {
                const text = overlay.textContent.toLowerCase();
                if (this.adKeywords.some(keyword => text.includes(keyword))) {
                    overlayCount++;
                }
            });

            if (overlayCount > 0) {
                score += Math.min(overlayCount * 0.15, 0.45);
                reasons.push(`Found ${overlayCount} potential anti-adblock overlays`);
            }

            const confidence = Math.min(score, 1);
            const isAntiAdblock = confidence > 0.5;

            return {
                isAntiAdblock,
                confidence,
                reason: reasons.join(', ') || 'Fallback page analysis'
            };
        }
    }

    /**
     * PatternMatcher - Phát hiện anti-adblock bằng pattern matching
     */
    class PatternMatcher {
        constructor(config) {
            this.config = config;
            this.patterns = [];
        }

        /**
         * Khởi tạo PatternMatcher
         */
        initialize() {
            // Tạo các pattern từ config
            this.patterns = this.config.scriptPatterns.map(pattern => ({
                regex: pattern,
                type: 'script'
            }));

            // Thêm các pattern cho URL
            this.patterns.push(
                { regex: /\/adblock-detector\.js/i, type: 'url' },
                { regex: /\/anti-adblock\.js/i, type: 'url' },
                { regex: /\/adblock-notice\.js/i, type: 'url' },
                { regex: /\/adblock-analytics\.js/i, type: 'url' },
                { regex: /\/ad-detector\.js/i, type: 'url' }
            );
        }

        /**
         * Phân tích script để phát hiện anti-adblock
         */
        analyzeScript(content) {
            let isAntiAdblock = false;
            let confidence = 0;
            let reason = '';

            // Kiểm tra các pattern
            for (const pattern of this.patterns) {
                if (pattern.type === 'script' && pattern.regex.test(content)) {
                    isAntiAdblock = true;
                    confidence = 0.8;
                    reason = `Matched pattern: ${pattern.regex}`;
                    break;
                }
            }

            // Kiểm tra các từ khóa
            if (!isAntiAdblock) {
                const lowerContent = content.toLowerCase();
                let keywordMatches = 0;

                for (const keyword of this.config.antiAdblockKeywords) {
                    if (lowerContent.includes(keyword.toLowerCase())) {
                        keywordMatches++;
                    }
                }

                if (keywordMatches >= 2) {
                    isAntiAdblock = true;
                    confidence = 0.6 + Math.min(keywordMatches * 0.05, 0.3);
                    reason = `Matched ${keywordMatches} anti-adblock keywords`;
                }
            }

            // Kiểm tra các hàm phát hiện adblock phổ biến
            if (!isAntiAdblock) {
                const commonFunctions = [
                    /function\s+\w*[Aa]d[Bb]lock\w*\s*\(/,
                    /function\s+\w*detect\w*\s*\(/,
                    /function\s+\w*check\w*[Aa]ds?\w*\s*\(/
                ];

                for (const func of commonFunctions) {
                    if (func.test(content)) {
                        isAntiAdblock = true;
                        confidence = 0.7;
                        reason = `Contains anti-adblock function: ${func}`;
                        break;
                    }
                }
            }

            return {
                isAntiAdblock,
                confidence,
                reason,
                neutralizationStrategy: isAntiAdblock ? this.generateNeutralizationStrategy(content) : null
            };
        }

        /**
         * Kiểm tra xem script có nên bị chặn không
         */
        shouldBlockScript(url) {
            // Kiểm tra các pattern URL
            for (const pattern of this.patterns) {
                if (pattern.type === 'url' && pattern.regex.test(url)) {
                    return true;
                }
            }

            // Kiểm tra các từ khóa trong URL
            for (const keyword of this.config.antiAdblockKeywords) {
                if (url.toLowerCase().includes(keyword.toLowerCase())) {
                    return true;
                }
            }

            return false;
        }

        /**
         * Tạo chiến lược vô hiệu hóa script
         */
        generateNeutralizationStrategy(content) {
            return function(script) {
                // Thay thế các pattern phát hiện adblock phổ biến
                let neutralized = script;

                // Vô hiệu hóa các hàm phát hiện adblock
                neutralized = neutralized.replace(/if\s*\(\s*window\.canRunAds === undefined\s*\)/g, 'if (false)');
                neutralized = neutralized.replace(/if\s*\(\s*document\.getElementById\(['"]\w*ad\w*['"]\)(\s*===\s*null|\s*==\s*null|\s*===\s*undefined|\s*==\s*undefined)\s*\)/g, 'if (false)');

                // Thay thế các từ khóa
                neutralized = neutralized.replace(/adblock/gi, 'adblock_disabled');
                neutralized = neutralized.replace(/AdBlock/g, 'AdBlock_disabled');
                neutralized = neutralized.replace(/blockAdBlock/g, 'blockAdBlock_disabled');
                neutralized = neutralized.replace(/fuckAdBlock/g, 'fuckAdBlock_disabled');

                // Thêm code để giả vờ quảng cáo đang hoạt động
                neutralized = `
                    // Anti-Adblock Killer neutralized this script
                    (function() {
                        window.canRunAds = true;
                        window.adsbygoogle = window.adsbygoogle || { loaded: true, push: function() {} };
                        window.google_ad_status = 1;
                    })();

                    // Original script (modified)
                    ${neutralized}
                `;

                return neutralized;
            };
        }
    }

    /**
     * BehaviorEmulator - Giả lập hành vi quảng cáo
     */
    class BehaviorEmulator {
        constructor(config) {
            this.config = config;
            this.emulationActive = false;
        }

        /**
         * Khởi tạo BehaviorEmulator
         */
        initialize() {
            if (!this.config.enableBehaviorEmulation) return;

            // Khởi tạo giả lập hành vi quảng cáo
            this.emulateAdBehavior();
            this.emulationActive = true;
        }

        /**
         * Giả lập hành vi quảng cáo
         */
        emulateAdBehavior() {
            // Giả lập tương tác với quảng cáo
            window.addEventListener('load', () => {
                setTimeout(() => {
                    this.simulateAdInteractions();
                }, 2000 + Math.random() * 3000);
            });

            // Giả lập các sự kiện quảng cáo
            this.emulateAdEvents();

            // Giả lập các biến quảng cáo
            this.emulateAdVariables();
        }

        /**
         * Giả lập tương tác với quảng cáo
         */
        simulateAdInteractions() {
            // Tìm các phần tử quảng cáo (thật hoặc giả)
            const adContainers = document.querySelectorAll('.ad-container, .ad-wrapper, [id^="ad-"], [class*="advertisement"], #aak-fake-ads div');

            if (adContainers.length > 0) {
                // Chọn một phần tử quảng cáo ngẫu nhiên
                const randomAd = adContainers[Math.floor(Math.random() * adContainers.length)];
                const rect = randomAd.getBoundingClientRect();

                // Tạo và gửi các sự kiện chuột
                const mouseOver = new MouseEvent('mouseover', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: rect.left + rect.width / 2,
                    clientY: rect.top + rect.height / 2
                });

                const mouseMove = new MouseEvent('mousemove', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: rect.left + rect.width / 2,
                    clientY: rect.top + rect.height / 2
                });

                randomAd.dispatchEvent(mouseOver);
                randomAd.dispatchEvent(mouseMove);

                // Đôi khi giả lập click
                if (Math.random() < 0.1) {
                    // Tạo iframe tạm thời để giả lập click mà không thực sự điều hướng
                    const tempFrame = document.createElement('iframe');
                    tempFrame.style.display = 'none';
                    document.body.appendChild(tempFrame);

                    setTimeout(() => {
                        document.body.removeChild(tempFrame);
                    }, 100);
                }
            }
        }

        /**
         * Giả lập các sự kiện quảng cáo
         */
        emulateAdEvents() {
            // Giả lập sự kiện Google AdSense
            if (typeof window.adsbygoogle === 'undefined') {
                window.adsbygoogle = { loaded: true, push: function(obj) { return obj; } };
            }

            // Giả lập sự kiện quảng cáo đã tải
            const adLoadedEvent = new CustomEvent('adLoaded');
            setTimeout(() => {
                document.dispatchEvent(adLoadedEvent);
            }, 1000);

            // Giả lập sự kiện quảng cáo đã hiển thị
            const adDisplayedEvent = new CustomEvent('adDisplayed');
            setTimeout(() => {
                document.dispatchEvent(adDisplayedEvent);
            }, 1500);
        }

        /**
         * Giả lập các biến quảng cáo
         */
        emulateAdVariables() {
            // Giả lập các biến Google AdSense
            window.google_ad_status = 1;
            window.google_ad_width = 300;
            window.google_ad_height = 250;
            window.google_ad_format = '300x250';
            window.google_ad_client = 'ca-pub-1234567890123456';

            // Giả lập các biến quảng cáo khác
            window.canRunAds = true;
            window.canShowAds = true;
            window.isAdBlockActive = false;
            window.adblockDetector = { detected: false };
        }
    }

    /**
     * NetworkInterceptor - Chặn và sửa đổi các yêu cầu mạng
     */
    class NetworkInterceptor {
        constructor(aak) {
            this.aak = aak;
        }

        /**
         * Khởi tạo NetworkInterceptor
         */
        initialize() {
            this.interceptFetch();
            this.interceptXHR();
            this.interceptBeacon();
        }

        /**
         * Chặn Fetch API
         */
        interceptFetch() {
            const originalFetch = window.fetch;
            const self = this;

            window.fetch = async function(url, options) {
                const urlString = (typeof url === 'string') ? url : (url && url.url);

                if (urlString && self.shouldModifyRequest(urlString)) {
                    self.aak.log(`Modifying fetch request to: ${urlString}`);
                    self.aak.stats.requestsModified++;

                    // Trả về phản hồi giả
                    return Promise.resolve(new Response(JSON.stringify({
                        success: true,
                        adblockDetected: false,
                        ads: [{id: 'fake-ad-1', content: 'dummy content'}]
                    }), {
                        status: 200,
                        headers: {'Content-Type': 'application/json'}
                    }));
                }

                return originalFetch.apply(this, arguments);
            };
        }

        /**
         * Chặn XMLHttpRequest
         */
        interceptXHR() {
            const originalOpen = XMLHttpRequest.prototype.open;
            const originalSend = XMLHttpRequest.prototype.send;
            const self = this;

            XMLHttpRequest.prototype.open = function(method, url, ...args) {
                if (url && typeof url === 'string' && self.shouldModifyRequest(url)) {
                    self.aak.log(`Modifying XHR request to: ${url}`);
                    self.aak.stats.requestsModified++;
                    this._aakModified = true;
                    this._aakOriginalUrl = url;
                }

                return originalOpen.apply(this, arguments);
            };

            XMLHttpRequest.prototype.send = function(body) {
                if (this._aakModified) {
                    const mockResponse = JSON.stringify({
                        success: true,
                        adblockDetected: false,
                        adsRendered: true,
                        version: "2.0"
                    });

                    // Giả lập phản hồi thành công
                    Object.defineProperty(this, 'response', { get: () => mockResponse });
                    Object.defineProperty(this, 'responseText', { get: () => mockResponse });
                    Object.defineProperty(this, 'status', { get: () => 200 });

                    // Giả lập sự kiện hoàn thành
                    setTimeout(() => {
                        this.readyState = 4;
                        if (typeof this.onreadystatechange === 'function') {
                            this.onreadystatechange();
                        }
                        if (typeof this.onload === 'function') {
                            this.onload();
                        }
                    }, 50);

                    return;
                }

                return originalSend.apply(this, arguments);
            };
        }

        /**
         * Chặn Beacon API
         */
        interceptBeacon() {
            const originalSendBeacon = navigator.sendBeacon;
            const self = this;

            if (originalSendBeacon) {
                navigator.sendBeacon = function(url, data) {
                    if (self.shouldModifyRequest(url)) {
                        self.aak.log(`Blocking beacon to: ${url}`);
                        self.aak.stats.requestsModified++;
                        return true; // Giả vờ thành công
                    }

                    return originalSendBeacon.apply(this, arguments);
                };
            }
        }

        /**
         * Kiểm tra xem yêu cầu có nên được sửa đổi không
         */
        shouldModifyRequest(url) {
            // Kiểm tra các từ khóa anti-adblock
            for (const keyword of this.aak.config.antiAdblockKeywords) {
                if (url.toLowerCase().includes(keyword.toLowerCase())) {
                    return true;
                }
            }

            // Kiểm tra các pattern URL phổ biến
            const antiAdblockPatterns = [
                /\/adblock-detector/i,
                /\/ad-detector/i,
                /\/anti-adblock/i,
                /\/adblock-analytics/i,
                /\/adblock-notice/i,
                /\/check-adblock/i,
                /\/adblock-checker/i,
                /\/detect-adblock/i
            ];

            for (const pattern of antiAdblockPatterns) {
                if (pattern.test(url)) {
                    return true;
                }
            }

            return false;
        }
    }

    /**
     * DOMObserver - Theo dõi và xử lý các thay đổi DOM
     */
    class DOMObserver {
        constructor(aak) {
            this.aak = aak;
            this.observer = null;
        }

        /**
         * Khởi tạo DOMObserver
         */
        initialize() {
            // Tạo MutationObserver để theo dõi các thay đổi DOM
            this.observer = new MutationObserver(this.handleMutations.bind(this));

            // Bắt đầu theo dõi
            this.observer.observe(document.documentElement, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style', 'class']
            });
        }

        /**
         * Xử lý các thay đổi DOM
         */
        handleMutations(mutations) {
            for (const mutation of mutations) {
                // Xử lý các node mới được thêm vào
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            this.processNewElement(node);
                        }
                    });
                }

                // Xử lý các thay đổi thuộc tính
                if (mutation.type === 'attributes') {
                    this.processAttributeChange(mutation.target, mutation.attributeName);
                }
            }
        }

        /**
         * Xử lý phần tử mới
         */
        processNewElement(element) {
            // Kiểm tra xem phần tử có phải là anti-adblock
            if (this.aak.isAntiAdblockElement(element)) {
                this.aak.log('Removing anti-adblock element:', element);
                element.remove();
                this.aak.stats.elementsRemoved++;
                this.aak.detectedAntiAdblock = true;
            }

            // Kiểm tra xem phần tử có phải là script
            if (element.tagName === 'SCRIPT') {
                const src = element.src;
                const content = element.textContent;

                // Kiểm tra script src
                if (src && this.aak.patternMatcher.shouldBlockScript(src)) {
                    this.aak.log(`Neutralizing script with src: ${src}`);
                    element.src = 'data:text/javascript,console.log("Script neutralized by AAK-AI");';
                    this.aak.stats.scriptsNeutralized++;
                }

                // Kiểm tra nội dung script
                if (content) {
                    const analysis = this.aak.analyzeScriptContent(content);
                    if (analysis.isAntiAdblock) {
                        this.aak.log(`Neutralizing inline script: ${analysis.reason}`);
                        element.textContent = this.aak.neutralizeScript(content, analysis);
                        this.aak.stats.scriptsNeutralized++;
                    }
                }
            }

            // Kiểm tra các phần tử con
            element.querySelectorAll('*').forEach(child => {
                this.processNewElement(child);
            });
        }

        /**
         * Xử lý thay đổi thuộc tính
         */
        processAttributeChange(element, attributeName) {
            // Kiểm tra các thay đổi style có thể ảnh hưởng đến scrolling
            if (attributeName === 'style') {
                const style = window.getComputedStyle(element);

                // Khôi phục scrolling nếu bị khóa
                if (element.tagName === 'BODY' || element.tagName === 'HTML') {
                    if (style.overflow === 'hidden' || style.position === 'fixed') {
                        element.style.overflow = '';
                        element.style.position = '';
                    }
                }
            }

            // Kiểm tra các thay đổi class có thể là anti-adblock
            if (attributeName === 'class') {
                const className = element.className || '';

                if (/adblock|ad[-\s]?block|ad blocker/i.test(className)) {
                    // Kiểm tra thêm để xác nhận đây là anti-adblock
                    if (this.aak.isAntiAdblockElement(element)) {
                        this.aak.log('Removing anti-adblock element after class change:', element);
                        element.remove();
                        this.aak.stats.elementsRemoved++;
                        this.aak.detectedAntiAdblock = true;
                    }
                }
            }
        }
    }

    /**
     * SiteSpecificHandler - Xử lý các trường hợp đặc biệt theo trang web
     */
    class SiteSpecificHandler {
        constructor(config) {
            this.config = config;
        }

        /**
         * Áp dụng các biện pháp theo trang web cụ thể
         */
        applySiteSpecificFixes() {
            const hostname = window.location.hostname;
            let appliedFixes = false;

            // Tìm cấu hình phù hợp
            for (const site in this.config.siteSpecific) {
                if (hostname.includes(site)) {
                    const siteConfig = this.config.siteSpecific[site];

                    // Áp dụng CSS để ẩn các phần tử
                    if (siteConfig.selectors && siteConfig.selectors.length) {
                        const style = document.createElement('style');
                        style.textContent = siteConfig.selectors.map(selector =>
                            `${selector} { display: none !important; }`
                        ).join('\n');
                        document.head.appendChild(style);
                    }

                    // Áp dụng custom fix nếu có
                    if (siteConfig.customFix && typeof this[siteConfig.customFix] === 'function') {
                        this[siteConfig.customFix]();
                    }

                    appliedFixes = true;
                    console.log(`Applied specific fixes for ${site}`);
                }
            }

            // Áp dụng các biện pháp chung nếu không có cấu hình cụ thể
            if (!appliedFixes) {
                this.applyGenericFixes();
            }
        }

        /**
         * Áp dụng các biện pháp chung
         */
        applyGenericFixes() {
            // Xóa các phần tử anti-adblock phổ biến
            const commonSelectors = [
                '.adblock-wall', '.adblock-detector', '.ad-blocker-warning',
                '.adblock-notification', '.ad-block-message', '.ad-blocker-notice',
                '[class*="adblock-"]', '[id*="adblock-"]', '[class*="AdBlock"]',
                '.paywall', '.subscription-wall', '.paid-content-gate'
            ];

            const style = document.createElement('style');
            style.textContent = commonSelectors.map(selector =>
                `${selector} { display: none !important; }`
            ).join('\n');
            document.head.appendChild(style);

            // Khôi phục scrolling
            const scrollFix = document.createElement('style');
            scrollFix.textContent = `
                html, body {
                    overflow: auto !important;
                    position: static !important;
                    height: auto !important;
                }
            `;
            document.head.appendChild(scrollFix);
        }

        /**
         * Fix cho Forbes
         */
        forbesAdblockFix() {
            // Xóa paywall
            const style = document.createElement('style');
            style.textContent = `
                .tp-modal, .tp-backdrop, .tp-iframe-wrapper, .fbs-auth__adblock {
                    display: none !important;
                }
                body {
                    overflow: auto !important;
                }
            `;
            document.head.appendChild(style);

            // Vô hiệu hóa script phát hiện adblock
            const script = document.createElement('script');
            script.textContent = `
                (function() {
                    // Vô hiệu hóa TinyPass/Piano
                    window.tp = window.tp || {
                        push: function() {},
                        experience: function() { return { init: function() {} }; },
                        setUserRef: function() {},
                        setCustomVariable: function() {}
                    };

                    // Vô hiệu hóa Forbes adblock detector
                    window.fbs_settings = window.fbs_settings || {};
                    window.fbs_settings.adBlockerDetector = false;
                })();
            `;
            document.head.appendChild(script);

            // Theo dõi và xóa các phần tử paywall mới
            const observer = new MutationObserver(() => {
                document.querySelectorAll('.tp-modal, .tp-backdrop, .tp-iframe-wrapper, .fbs-auth__adblock').forEach(el => {
                    el.remove();
                });
                document.body.style.overflow = 'auto';
            });

            observer.observe(document.documentElement, {
                childList: true,
                subtree: true
            });
        }

        /**
         * Fix cho Wired
         */
        wiredPaywallFix() {
            // Xóa paywall
            const style = document.createElement('style');
            style.textContent = `
                .paywall-container, .callout--warning, .paywall-bar {
                    display: none !important;
                }
                body.paywall-active {
                    overflow: auto !important;
                }
                .main-content {
                    opacity: 1 !important;
                    filter: blur(0) !important;
                }
            `;
            document.head.appendChild(style);

            // Vô hiệu hóa script phát hiện adblock
            const script = document.createElement('script');
            script.textContent = `
                (function() {
                    // Vô hiệu hóa Wired paywall
                    window.WIREDBlocker = { checkAdBlocker: function() { return false; } };

                    // Xóa class paywall-active
                    document.body.classList.remove('paywall-active');

                    // Khôi phục nội dung
                    document.querySelectorAll('.main-content').forEach(el => {
                        el.style.opacity = '1';
                        el.style.filter = 'blur(0)';
                    });
                })();
            `;
            document.head.appendChild(script);
        }

        /**
         * Fix cho New York Times
         */
        nytimesPaywallFix() {
            // Xóa paywall
            const style = document.createElement('style');
            style.textContent = `
                div[id*="gateway-content"], div[class*="gateway-container"], div[class*="modal__overlay"], .css-mcm29f {
                    display: none !important;
                }
                body {
                    overflow: auto !important;
                    position: static !important;
                }
                html {
                    overflow: auto !important;
                    position: static !important;
                }
                .css-1bd8bfl, .css-9epb7j {
                    filter: blur(0) !important;
                    opacity: 1 !important;
                }
            `;
            document.head.appendChild(style);

            // Vô hiệu hóa script phát hiện adblock
            const script = document.createElement('script');
            script.textContent = `
                (function() {
                    // Xóa các class và style giới hạn nội dung
                    document.querySelectorAll('html, body').forEach(el => {
                        el.style.overflow = 'auto';
                        el.style.position = 'static';
                    });

                    // Khôi phục nội dung
                    document.querySelectorAll('section[name="articleBody"]').forEach(el => {
                        el.style.filter = 'blur(0)';
                        el.style.opacity = '1';
                    });

                    // Vô hiệu hóa gateway
                    window.gatewayCreative = { init: function() {} };
                })();
            `;
            document.head.appendChild(script);
        }
    }

    /**
     * SelfLearningSystem - Hệ thống tự học để cải thiện phát hiện anti-adblock
     */
    class SelfLearningSystem {
        constructor(config) {
            this.config = config;
            this.data = {
                detections: [],
                patterns: {},
                sites: {}
            };
        }

        /**
         * Khởi tạo hệ thống tự học
         */
        initialize() {
            // Tải dữ liệu từ storage
            if (typeof GM_getValue !== 'undefined') {
                const savedData = GM_getValue('aak-learning-data', null);
                if (savedData) {
                    try {
                        this.data = JSON.parse(savedData);
                    } catch (e) {
                        console.error('Failed to parse learning data:', e);
                    }
                }
            }
        }

        /**
         * Học từ phát hiện anti-adblock
         */
        learnFromDetection(detection) {
            // Thêm vào danh sách phát hiện
            this.data.detections.push({
                url: detection.url,
                hostname: detection.hostname,
                timestamp: detection.timestamp,
                elementCount: detection.detectedElements.length
            });

            // Giới hạn số lượng phát hiện lưu trữ
            if (this.data.detections.length > 100) {
                this.data.detections = this.data.detections.slice(-100);
            }

            // Cập nhật thông tin trang web
            if (!this.data.sites[detection.hostname]) {
                this.data.sites[detection.hostname] = {
                    detectionCount: 0,
                    lastDetection: 0,
                    selectors: []
                };
            }

            const site = this.data.sites[detection.hostname];
            site.detectionCount++;
            site.lastDetection = detection.timestamp;

            // Học các selector từ các phần tử phát hiện được
            detection.detectedElements.forEach(element => {
                // Tạo selector cho phần tử
                const selector = this.generateSelector(element);

                // Thêm vào danh sách selector của trang web
                if (selector && !site.selectors.includes(selector)) {
                    site.selectors.push(selector);
                }

                // Cập nhật patterns
                const className = element.className || '';
                const id = element.id || '';

                if (className) {
                    className.split(' ').forEach(cls => {
                        if (cls && cls.length > 3) {
                            this.updatePattern('class', cls);
                        }
                    });
                }

                if (id && id.length > 3) {
                    this.updatePattern('id', id);
                }
            });

            // Lưu dữ liệu
            this.saveData();
        }

        /**
         * Tạo selector cho phần tử
         */
        generateSelector(element) {
            if (!element) return null;

            // Ưu tiên sử dụng ID
            if (element.id) {
                return `#${element.id}`;
            }

            // Sử dụng class nếu có
            if (element.className) {
                const classes = element.className.split(' ').filter(c => c.length > 0);
                if (classes.length > 0) {
                    return `.${classes.join('.')}`;
                }
            }

            // Sử dụng tag name và thuộc tính
            const tagName = element.tagName.toLowerCase();

            // Kiểm tra các thuộc tính đặc biệt
            for (const attr of ['role', 'data-testid', 'aria-label']) {
                if (element.hasAttribute(attr)) {
                    return `${tagName}[${attr}="${element.getAttribute(attr)}"]`;
                }
            }

            return null;
        }

        /**
         * Cập nhật pattern
         */
        updatePattern(type, value) {
            if (!this.data.patterns[type]) {
                this.data.patterns[type] = {};
            }

            if (!this.data.patterns[type][value]) {
                this.data.patterns[type][value] = 0;
            }

            this.data.patterns[type][value]++;
        }

        /**
         * Lưu dữ liệu
         */
        saveData() {
            if (typeof GM_setValue !== 'undefined') {
                GM_setValue('aak-learning-data', JSON.stringify(this.data));
            }
        }

        /**
         * Xóa dữ liệu học tập
         */
        clearData() {
            this.data = {
                detections: [],
                patterns: {},
                sites: {}
            };

            if (typeof GM_setValue !== 'undefined') {
                GM_setValue('aak-learning-data', JSON.stringify(this.data));
            }
        }

        /**
         * Lấy thông tin học tập
         */
        getLearningInfo() {
            return {
                detectionCount: this.data.detections.length,
                siteCount: Object.keys(this.data.sites).length,
                topSites: this.getTopSites(5),
                commonPatterns: this.getCommonPatterns(5)
            };
        }

        /**
         * Lấy các trang web phổ biến nhất
         */
        getTopSites(count) {
            return Object.entries(this.data.sites)
                .sort((a, b) => b[1].detectionCount - a[1].detectionCount)
                .slice(0, count)
                .map(([hostname, data]) => ({
                    hostname,
                    detectionCount: data.detectionCount,
                    lastDetection: new Date(data.lastDetection).toLocaleDateString()
                }));
        }

        /**
         * Lấy các pattern phổ biến nhất
         */
        getCommonPatterns(count) {
            const patterns = [];

            for (const type in this.data.patterns) {
                for (const value in this.data.patterns[type]) {
                    patterns.push({
                        type,
                        value,
                        count: this.data.patterns[type][value]
                    });
                }
            }

            return patterns
                .sort((a, b) => b.count - a.count)
                .slice(0, count);
        }
    }

    // Khởi tạo và chạy Anti-Adblock Killer AI
    const aak = new AntiAdblockKillerAI();
    aak.initialize();
})();
