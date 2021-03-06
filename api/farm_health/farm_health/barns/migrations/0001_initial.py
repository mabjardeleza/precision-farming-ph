# Generated by Django 2.1.2 on 2018-11-10 15:47

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import model_utils.fields
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Barn',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('reference_id', models.UUIDField(default=uuid.uuid4, unique=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='SensorDataPoint',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('humidity', models.DecimalField(blank=True, decimal_places=4, max_digits=12, null=True)),
                ('temperature', models.DecimalField(blank=True, decimal_places=4, max_digits=12, null=True)),
                ('air_quality', models.DecimalField(blank=True, decimal_places=4, max_digits=12, null=True)),
                ('image_feed', models.ImageField(upload_to='uploads/feed/')),
                ('barn', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='barns.Barn')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
