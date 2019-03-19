import scrapy
from server.database import Notices, init_db
from server.config import config

class NoticesSearcher(scrapy.Spider):
    name = "quotes"
    def start_requests(self):
        init_db(config)
        urls = [
            "https://g1.globo.com/ciencia-e-saude/"
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)
    
    def parse(self, response):
        titles = response.css('a.feed-post-link::text').getall()
        hrefs = response.css('a.feed-post-link::attr(href)').getall()
        summaries = response.css('div.feed-post-body-resumo div::text').getall()
        times = response.css('div.feed-post-metadata span.feed-post-datetime::text').getall()
        print(type(Notices))
        for i in range(len(titles)):
            notice = Notices()
            notice.title = titles[i]
            notice.href = hrefs[i]
            notice.summary = summaries[i]
            notice.time = times[i]
            notice.site = 'Globo'
            notice.save()