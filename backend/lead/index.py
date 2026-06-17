"""Приём заявок с сайта DSSERVIS: сохранение в БД и уведомление в VK"""
import json
import os
import urllib.request
import urllib.parse


def handler(event: dict, context) -> dict:
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': headers, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    service = body.get('service', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Имя и телефон обязательны'}),
        }

    import psycopg2
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO leads (name, phone, service) VALUES (%s, %s, %s) RETURNING id",
        (name, phone, service)
    )
    lead_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    vk_token = os.environ.get('VK_BOT_TOKEN', '')
    vk_admin_id = os.environ.get('VK_ADMIN_ID', '')

    if vk_token and vk_admin_id:
        service_label = f"Услуга: {service}" if service else "Услуга: не указана"
        message = (
            f"🔔 Новая заявка №{lead_id} — DSSERVIS\n\n"
            f"👤 Имя: {name}\n"
            f"📞 Телефон: {phone}\n"
            f"🔧 {service_label}"
        )
        params = urllib.parse.urlencode({
            'user_id': vk_admin_id,
            'message': message,
            'access_token': vk_token,
            'v': '5.199',
            'random_id': lead_id,
        })
        req = urllib.request.Request(
            f'https://api.vk.com/method/messages.send?{params}'
        )
        urllib.request.urlopen(req, timeout=5)

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'ok': True, 'id': lead_id}),
    }